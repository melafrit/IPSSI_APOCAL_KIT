#!/usr/bin/env python3
"""Benchmark Ollama local pour le modele par defaut du projet: llama3.1:8b.

Mesures:
- latence mediane et p95
- qualite subjective /5 saisie par 3 testeurs minimum
- taille disque du modele
- pic RAM observe pendant la generation
- GPU requis: non requis en benchmark CPU local

Le recap final est en console en format markdown
"""

from __future__ import annotations

import concurrent.futures
import json
import math
import os
import pathlib
import re
import statistics
import subprocess
import tempfile
import time
import urllib.error
import urllib.request
from dataclasses import dataclass

OLLAMA_CONTAINER = os.environ.get("OLLAMA_CONTAINER", "apocalipssi-2026-ollama")
OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434").rstrip("/")
MODEL = "llama3.1:8b"
RUNS = int(os.environ.get("RUNS_PER_MODEL", "5"))
WARMUP_RUNS = int(os.environ.get("WARMUP_RUNS", "1"))
SLEEP_BETWEEN_RUNS = float(os.environ.get("SLEEP_BETWEEN_RUNS", "0"))

SYSTEM_PROMPT = (
    "Tu es un assistant pedagogique francophone specialise en generation de QCM. "
    "A partir du cours fourni, tu generes exactement 10 questions a choix multiples "
    "pour aider un etudiant a reviser.\n\n"
    "Regles ABSOLUES :\n"
    "- Exactement 10 questions.\n"
    "- Chaque question a EXACTEMENT 4 options.\n"
    '- Une seule bonne reponse par question, indiquee par "correct_index" (0 a 3).\n'
    "- Pas de markdown, pas de balises HTML, pas d'explications hors JSON.\n"
    "- Sortie = JSON STRICT et UNIQUEMENT JSON."
)

SOURCE_TEXT = (
    "Le protocole HTTP permet a un client et a un serveur d'echanger des ressources "
    "via des requetes et des reponses. Une requete contient une methode, une URL "
    "et des en-tetes ; une reponse contient un code de statut, des en-tetes et un "
    "corps. Les methodes les plus connues sont GET, POST, PUT et DELETE. Le code 200 "
    "indique un succes, le code 404 une ressource introuvable et le code 500 une "
    "erreur cote serveur. Les QCM generes doivent rester factuels, courts et "
    "exactement alignes sur ce texte."
)


@dataclass
class BenchmarkResult:
    model: str
    median_s: float
    p95_s: float
    quality_avg: float
    peak_ram_mib: float
    disk_size: str
    gpu_required: str
    sample_file: pathlib.Path


def run(cmd: list[str], *, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=check, capture_output=True, text=True)


def ensure_prereqs() -> None:
    for tool in ("docker", "python3"):
        if (
            subprocess.run(
                ["bash", "-lc", f"command -v {tool} >/dev/null 2>&1"]
            ).returncode
            != 0
        ):
            raise SystemExit(f"ERREUR: {tool} est requis pour ce benchmark.")

    names = run(["docker", "ps", "--format", "{{.Names}}"]).stdout.split()
    if OLLAMA_CONTAINER not in names:
        raise SystemExit(
            f"ERREUR: le conteneur '{OLLAMA_CONTAINER}' n'est pas demarre.\n"
            "Lance d'abord: docker compose up -d"
        )


def ensure_model_present() -> None:
    out = run(["docker", "exec", OLLAMA_CONTAINER, "ollama", "list"]).stdout
    for line in out.splitlines()[1:]:
        if line.split()[:1] == [MODEL]:
            return

    print(f"==> Modele absent: {MODEL}")
    print("    Telechargement via Ollama...")
    subprocess.run(
        ["docker", "exec", OLLAMA_CONTAINER, "ollama", "pull", MODEL], check=True
    )


def parse_mem_to_mib(text: str) -> float | None:
    text = text.strip()
    if not text:
        return None

    parts = text.split()
    if not parts:
        return None

    token = parts[0]
    number = ""
    unit = ""
    for ch in token:
        if ch.isdigit() or ch == ".":
            number += ch
        else:
            unit += ch

    units = {
        "B": 1 / (1024 * 1024),
        "KiB": 1 / 1024,
        "MiB": 1.0,
        "GiB": 1024.0,
        "TiB": 1024.0 * 1024.0,
        "KB": 1 / 1000,
        "MB": 1000 / 1024,
        "GB": 1000 * 1000 / (1024 * 1024),
        "TB": 1000 * 1000 * 1000 / (1024 * 1024),
    }
    if not number or unit not in units:
        return None
    return float(number) * units[unit]


def docker_peak_mem_mib() -> float | None:
    out = run(
        [
            "docker",
            "stats",
            "--no-stream",
            "--format",
            "{{.MemUsage}}",
            OLLAMA_CONTAINER,
        ]
    ).stdout
    values = [
        v for line in out.splitlines() if (v := parse_mem_to_mib(line)) is not None
    ]
    return max(values) if values else None


def build_payload() -> dict:
    return {
        "model": MODEL,
        "prompt": f"{SYSTEM_PROMPT}\n\nCours:\n{SOURCE_TEXT}\n\nConsigne: genere exactement 10 questions.",
        "stream": False,
        "options": {"temperature": 0.4},
        "format": "json",
    }


def post_once(payload: dict) -> tuple[int, bytes, float]:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        f"{OLLAMA_HOST}/api/generate",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    start = time.perf_counter()
    try:
        with urllib.request.urlopen(request, timeout=600) as response:
            raw = response.read()
            code = response.getcode()
    except urllib.error.HTTPError as exc:
        raw = exc.read()
        code = exc.code
    elapsed = time.perf_counter() - start
    return code, raw, elapsed


def measure_once(payload: dict) -> tuple[float, float | None, bytes]:
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(post_once, payload)
        peak = 0.0
        while not future.done():
            current = docker_peak_mem_mib()
            if current is not None:
                peak = max(peak, current)
            time.sleep(0.25)
        code, raw, elapsed = future.result()

    if code != 200:
        snippet = raw.decode("utf-8", errors="replace")
        raise RuntimeError(f"Appel Ollama echoue (HTTP {code}): {snippet}")

    return elapsed, peak or None, raw


def extract_model_json(raw: bytes) -> dict:
    try:
        data = json.loads(raw.decode("utf-8"))
    except Exception:
        data = {}

    response = data.get("response", "")
    if not response:
        return data

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        match = re.search(r"\{[\s\S]*\}", response)
        if match:
            return json.loads(match.group(0))
        raise


def nearest_p95(values: list[float]) -> tuple[float, float]:
    ordered = sorted(values)
    median = statistics.median(ordered)
    rank = max(1, math.ceil(0.95 * len(ordered)))
    p95 = ordered[rank - 1]
    return median, p95


def read_quality_scores() -> float:
    scores = []
    for tester in range(1, 4):
        while True:
            raw = input(f"    Note testeur {tester} pour {MODEL} (/5) : ").strip()
            try:
                score = float(raw)
            except ValueError:
                print("    Entree invalide, recommence.")
                continue
            if 0 <= score <= 5:
                scores.append(score)
                break
            print("    La note doit etre entre 0 et 5.")
    return statistics.mean(scores)


def disk_size_for_model() -> str:
    out = run(["docker", "exec", OLLAMA_CONTAINER, "ollama", "list"]).stdout
    for line in out.splitlines()[1:]:
        parts = line.split()
        if parts[:1] == [MODEL] and len(parts) >= 3:
            return parts[2]
    return "n/a"


def run_benchmark(tmpdir: pathlib.Path) -> BenchmarkResult:
    ensure_model_present()
    payload = build_payload()
    sample_file = pathlib.Path(__file__).resolve().parent / "llama3.1_8b_sample.json"

    latencies: list[float] = []
    peak_mib = 0.0
    last_raw = b""

    for idx in range(1, WARMUP_RUNS + RUNS + 1):
        elapsed, peak, raw = measure_once(payload)
        last_raw = raw
        if peak is not None:
            peak_mib = max(peak_mib, peak)
        if idx <= WARMUP_RUNS:
            print(f"==> Warmup {MODEL} #{idx} : {elapsed:.2f}s")
            continue
        latencies.append(elapsed)
        print(f"==> {MODEL} run {idx - WARMUP_RUNS}/{RUNS} : {elapsed:.2f}s")
        if SLEEP_BETWEEN_RUNS:
            time.sleep(SLEEP_BETWEEN_RUNS)

    sample_file.write_text(
        json.dumps(extract_model_json(last_raw), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print("")
    print(f"==> Echantillon pour {MODEL}")
    print(f"    Fichier brut : {sample_file}")
    print("    Lis le quiz, puis saisis 3 notes /5.")
    quality_avg = read_quality_scores()
    median_s, p95_s = nearest_p95(latencies)
    disk_size = disk_size_for_model()

    return BenchmarkResult(
        model=MODEL,
        median_s=median_s,
        p95_s=p95_s,
        quality_avg=quality_avg,
        peak_ram_mib=peak_mib,
        disk_size=disk_size,
        gpu_required="non requis (CPU)",
        sample_file=sample_file,
    )


def print_summary(result: BenchmarkResult) -> None:
    summary = (
        "== Recapitulatif ==\n"
        "| Modele | Mediane (s) | P95 (s) | Qualite moyenne /5 | RAM pic | Disque | GPU requis |\n"
        "|---|---:|---:|---:|---:|---:|---|\n"
        f"| {result.model} | {result.median_s:.2f} | {result.p95_s:.2f} | "
        f"{result.quality_avg:.2f} | {result.peak_ram_mib:.2f} MiB | "
        f"{result.disk_size} | {result.gpu_required} |\n"
    )
    summary_file = pathlib.Path(__file__).resolve().parent / "recapitulatif.md"
    summary_file.write_text(summary, encoding="utf-8")

    print("")
    print(summary.rstrip())
    print("")
    print(f"Recapitulatif ecrit dans : {summary_file}")


def main() -> int:
    print("==> Benchmark Ollama local")
    print(f"    Conteneur : {OLLAMA_CONTAINER}")
    print(f"    Host      : {OLLAMA_HOST}")
    print(f"    Modele    : {MODEL}")
    print(f"    Runs      : {RUNS} (+ {WARMUP_RUNS} warmup)")
    print("")

    ensure_prereqs()
    tmpdir = pathlib.Path(tempfile.mkdtemp(prefix="bench_llama318b_"))
    try:
        result = run_benchmark(tmpdir)
        print_summary(result)
        return 0
    finally:
        for path in tmpdir.iterdir():
            try:
                path.unlink()
            except OSError:
                pass
        try:
            tmpdir.rmdir()
        except OSError:
            pass


if __name__ == "__main__":
    raise SystemExit(main())
