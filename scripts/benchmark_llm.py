#!/usr/bin/env python3
"""
benchmark_llm.py â€” Benchmark multi-mÃ©thodes des modÃ¨les LLM (Ollama)
Perturbation J2 Â· APOCAL'IPSSI Â· Projet EduTutor IA

ALIGNÃ‰ SUR L'ADR-002 (StratÃ©gie de benchmark)
  DÃ©cision : tester PLUSIEURS mÃ©thodes de benchmark en phase initiale, puis en
  retenir UNE SEULE comme rÃ©fÃ©rence pour comparer les modÃ¨les tout au long du
  projet (comparaisons homogÃ¨nes, reproductibles, sans biais inter-mÃ©thodes).

  Ce script implÃ©mente cette stratÃ©gie :
    1. PHASE INITIALE  -> lance les 4 mÃ©thodes ci-dessous sur tous les modÃ¨les.
    2. MÃ‰THODE DE RÃ‰F. -> une fois l'Ã©quipe dÃ©cidÃ©e, on renseigne
       BENCHMARK_REFERENCE, et le script peut comparer n'importe quel jeu de
       modÃ¨les avec CETTE SEULE mÃ©thode.

LES 4 MÃ‰THODES DE BENCHMARK TESTÃ‰ES
  - "latence"    : vitesse pure (p50 / p95 sur N runs). Seuil J2 : p95 <= 15 s.
  - "qualite"    : validitÃ© structurelle du quiz gÃ©nÃ©rÃ© (JSON, 10 questions,
                   4 options, 1 bonne rÃ©ponse valide) -> score /10 automatique.
  - "ressources" : empreinte disque/RAM du modÃ¨le (via l'API Ollama).
  - "composite"  : score unique /100 combinant les 3 (compromis explicite).

PROTOCOLE (Ã  reporter dans l'ADR pour la reproductibilitÃ©)
  MÃªme cours de rÃ©fÃ©rence (cours_reference.txt) Â· mÃªme machine (CPU/GPU/RAM Ã 
  documenter) Â· mÃªme prompt Â· N runs fixÃ©s ci-dessous.

PRÃ‰REQUIS
  Ollama lancÃ© en local (http://localhost:11434) et modÃ¨les tÃ©lÃ©chargÃ©s :
      ollama pull llama3.1:8b
      ollama pull llama3.2:3b
      ollama pull phi3:mini

LANCEMENT
      python scripts/benchmark_llm.py
  RÃ©sultats Ã  l'Ã©cran ET export dans benchmark_resultats.md (Ã  committer).
"""

import time
import json
import sys
import re
import urllib.request

# =========================================================================
# PARAMÃˆTRES DU PROTOCOLE
# =========================================================================
OLLAMA_URL_GEN = "http://localhost:11434/api/generate"
OLLAMA_URL_TAGS = "http://localhost:11434/api/tags"

MODELS = ["llama3.1:8b", "llama3.2:3b", "phi3:mini"]
COURS_PATH = "scripts/cours_reference.txt"
EXPORT_PATH = "scripts/benchmark_resultats.md"

RUNS_LATENCE = 5          # nb de runs pour mesurer p50/p95
RUNS_QUALITE = 2          # nb de quiz gÃ©nÃ©rÃ©s pour Ã©valuer la qualitÃ© structurelle
SEUIL_P95 = 15            # objectif J2 : p95 <= 15 s

# Poids du score composite (doivent sommer Ã  1.0)
POIDS = {"latence": 0.40, "qualite": 0.40, "ressources": 0.20}

# >>> Ã€ RENSEIGNER APRÃˆS LA PHASE INITIALE (cf. ADR-002) <<<
# Mettez "latence" | "qualite" | "ressources" | "composite" pour figer
# la mÃ©thode de rÃ©fÃ©rence. Laissez None pour lancer la phase initiale complÃ¨te.
BENCHMARK_REFERENCE = "composite"

PROMPT_TEMPLATE = """Tu es un gÃ©nÃ©rateur de quiz pÃ©dagogique.
Ã€ partir du cours ci-dessous, gÃ©nÃ¨re EXACTEMENT 10 questions Ã  choix multiples.
RÃ©ponds UNIQUEMENT par un tableau JSON valide, sans texte autour, au format :
[
  {{"question": "...", "options": ["...", "...", "...", "..."], "bonne_reponse": "..."}}
]
La valeur de "bonne_reponse" doit Ãªtre identique Ã  l'une des 4 options.

COURS :
{cours}
"""


# =========================================================================
# ACCÃˆS OLLAMA
# =========================================================================
def ollama_generate(model: str, prompt: str):
    """Renvoie (texte_reponse, duree_secondes)."""
    payload = json.dumps({"model": model, "prompt": prompt, "stream": False}).encode()
    req = urllib.request.Request(
        OLLAMA_URL_GEN, data=payload, headers={"Content-Type": "application/json"}
    )
    start = time.perf_counter()
    with urllib.request.urlopen(req, timeout=600) as resp:
        data = json.loads(resp.read())
    duree = time.perf_counter() - start
    return data.get("response", ""), duree


def ollama_taille_go(model: str):
    """Taille disque du modÃ¨le en Go (via /api/tags). None si introuvable."""
    try:
        with urllib.request.urlopen(OLLAMA_URL_TAGS, timeout=30) as resp:
            tags = json.loads(resp.read()).get("models", [])
        for m in tags:
            if m.get("name") == model or m.get("name", "").startswith(model):
                return round(m.get("size", 0) / 1e9, 2)
    except Exception:
        return None
    return None


# =========================================================================
# OUTILS
# =========================================================================
def percentile(values, p: float) -> float:
    s = sorted(values)
    if len(s) == 1:
        return s[0]
    k = (len(s) - 1) * p
    f = int(k)
    c = min(f + 1, len(s) - 1)
    return s[f] + (s[c] - s[f]) * (k - f)


def normaliser(valeurs: dict, plus_petit_est_mieux: bool) -> dict:
    """Min-max -> [0,1]. 1 = meilleur. Robuste si toutes les valeurs sont Ã©gales."""
    nums = [v for v in valeurs.values() if v is not None]
    if not nums:
        return {k: 0.0 for k in valeurs}
    lo, hi = min(nums), max(nums)
    out = {}
    for k, v in valeurs.items():
        if v is None:
            out[k] = 0.0
        elif hi == lo:
            out[k] = 1.0
        else:
            n = (v - lo) / (hi - lo)
            out[k] = (1 - n) if plus_petit_est_mieux else n
    return out


# =========================================================================
# MÃ‰THODES DE BENCHMARK
# =========================================================================
def methode_latence(prompt: str) -> dict:
    """Vitesse pure : p50 / p95 sur RUNS_LATENCE runs."""
    res = {}
    for model in MODELS:
        times = []
        for i in range(RUNS_LATENCE):
            try:
                _, t = ollama_generate(model, prompt)
                times.append(t)
                print(f"  [latence]    {model:<16} {i + 1}/{RUNS_LATENCE} : {t:5.1f}s", end="\r")
            except Exception as e:
                print(f"\n  âš ï¸  {model} (latence) : {e}")
                break
        if times:
            res[model] = {"p50": percentile(times, 0.50), "p95": percentile(times, 0.95)}
    print(" " * 60, end="\r")
    return res


def evaluer_quiz(texte: str) -> float:
    """Score structurel /10 d'un quiz gÃ©nÃ©rÃ© (proxy automatique de qualitÃ©)."""
    match = re.search(r"\[.*\]", texte, re.DOTALL)
    if not match:
        return 0.0
    try:
        quiz = json.loads(match.group(0))
    except Exception:
        return 0.0
    if not isinstance(quiz, list) or not quiz:
        return 0.0

    points, total = 0, 0
    # critÃ¨re 1 : exactement 10 questions
    total += 1
    if len(quiz) == 10:
        points += 1
    # critÃ¨res par question (moyennÃ©s)
    ok_options, ok_reponse, ok_texte = 0, 0, 0
    for q in quiz:
        if isinstance(q, dict):
            opts = q.get("options", [])
            if isinstance(opts, list) and len(opts) == 4:
                ok_options += 1
            if q.get("bonne_reponse") in opts:
                ok_reponse += 1
            if str(q.get("question", "")).strip():
                ok_texte += 1
    n = len(quiz)
    total += 3
    points += (ok_options / n) + (ok_reponse / n) + (ok_texte / n)
    return round(points / total * 10, 1)


def methode_qualite(prompt: str) -> dict:
    """ValiditÃ© structurelle moyenne du quiz sur RUNS_QUALITE gÃ©nÃ©rations."""
    res = {}
    for model in MODELS:
        scores = []
        for i in range(RUNS_QUALITE):
            try:
                texte, _ = ollama_generate(model, prompt)
                scores.append(evaluer_quiz(texte))
                print(f"  [qualite]    {model:<16} {i + 1}/{RUNS_QUALITE}", end="\r")
            except Exception as e:
                print(f"\n  âš ï¸  {model} (qualite) : {e}")
                break
        if scores:
            res[model] = {"score_auto_10": round(sum(scores) / len(scores), 1)}
    print(" " * 60, end="\r")
    return res


def methode_ressources() -> dict:
    """Empreinte disque (Go) de chaque modÃ¨le."""
    res = {}
    for model in MODELS:
        taille = ollama_taille_go(model)
        if taille is not None:
            res[model] = {"taille_go": taille}
    return res


def methode_composite(lat: dict, qual: dict, ress: dict) -> dict:
    """Score unique /100 combinant latence + qualitÃ© + ressources."""
    p95 = {m: lat.get(m, {}).get("p95") for m in MODELS}
    qa = {m: qual.get(m, {}).get("score_auto_10") for m in MODELS}
    go = {m: ress.get(m, {}).get("taille_go") for m in MODELS}

    n_lat = normaliser(p95, plus_petit_est_mieux=True)
    n_qual = normaliser(qa, plus_petit_est_mieux=False)
    n_ress = normaliser(go, plus_petit_est_mieux=True)

    res = {}
    for m in MODELS:
        score = (POIDS["latence"] * n_lat.get(m, 0)
                 + POIDS["qualite"] * n_qual.get(m, 0)
                 + POIDS["ressources"] * n_ress.get(m, 0)) * 100
        res[m] = {"score_100": round(score, 1)}
    return res


# =========================================================================
# RENDU
# =========================================================================
def main():
    try:
        with open(COURS_PATH, encoding="utf-8") as f:
            cours = f.read()
    except FileNotFoundError:
        print(f"âš ï¸  CrÃ©e d'abord '{COURS_PATH}' : un cours de test (~1 page), LE MÃŠME")
        print("    pour tous les modÃ¨les. C'est la base reproductible du benchmark.")
        sys.exit(1)

    prompt = PROMPT_TEMPLATE.format(cours=cours)
    print(f"Cours de rÃ©fÃ©rence : {COURS_PATH} ({len(cours)} caractÃ¨res)")
    print(f"ModÃ¨les : {', '.join(MODELS)}\n")

    # --- exÃ©cution des mÃ©thodes ---
    lat = methode_latence(prompt)
    qual = methode_qualite(prompt)
    ress = methode_ressources()
    comp = methode_composite(lat, qual, ress)

    # --- tableau rÃ©cap Ã  l'Ã©cran ---
    print(f"\n{'ModÃ¨le':<16}{'p50':>7}{'p95':>7}{'Qual/10':>9}{'Go':>7}{'Compo/100':>11}")
    print("-" * 57)
    for m in MODELS:
        p50 = lat.get(m, {}).get("p50")
        p95 = lat.get(m, {}).get("p95")
        qa = qual.get(m, {}).get("score_auto_10")
        go = ress.get(m, {}).get("taille_go")
        cp = comp.get(m, {}).get("score_100")
        fmt = lambda v, s="{:.1f}": (s.format(v) if v is not None else "  -")
        flag = ""
        if p95 is not None:
            flag = "  âœ…" if p95 <= SEUIL_P95 else "  âŒ"
        print(f"{m:<16}{fmt(p50):>7}{fmt(p95):>7}{fmt(qa):>9}{fmt(go):>7}{fmt(cp):>11}{flag}")

    if BENCHMARK_REFERENCE:
        print(f"\n>>> MÃ©thode de rÃ©fÃ©rence retenue (ADR-002) : '{BENCHMARK_REFERENCE}'")
        print("    Les comparaisons ultÃ©rieures n'utiliseront QUE cette mÃ©thode.")
    else:
        print("\n>>> Phase initiale : 4 mÃ©thodes testÃ©es. Choisissez-en UNE comme")
        print("    rÃ©fÃ©rence (ADR-002), puis renseignez BENCHMARK_REFERENCE en haut.")

    # --- export markdown (preuve Ã  committer) ---
    with open(EXPORT_PATH, "w", encoding="utf-8") as f:
        f.write("# RÃ©sultats du benchmark LLM â€” Perturbation J2 (ADR-002)\n\n")
        f.write(f"- Cours de rÃ©fÃ©rence : `{COURS_PATH}` ({len(cours)} caractÃ¨res)\n")
        f.write(f"- Runs : latence={RUNS_LATENCE}, qualitÃ©={RUNS_QUALITE} Â· Seuil p95 â‰¤ {SEUIL_P95}s\n")
        f.write(f"- Poids composite : {POIDS}\n")
        f.write("- Machine : *[ Ã  complÃ©ter : CPU / GPU / RAM ]* Â· Date : *[ Ã  complÃ©ter ]*\n\n")
        f.write("## Phase initiale â€” comparaison des mÃ©thodes\n\n")
        f.write("| ModÃ¨le | Latence p50 (s) | Latence p95 (s) | QualitÃ© auto /10 | "
                "QualitÃ© testeurs /5 | Ressources (Go) | Composite /100 |\n")
        f.write("|---|---|---|---|---|---|---|\n")
        for m in MODELS:
            p50 = lat.get(m, {}).get("p50")
            p95 = lat.get(m, {}).get("p95")
            qa = qual.get(m, {}).get("score_auto_10")
            go = ress.get(m, {}).get("taille_go")
            cp = comp.get(m, {}).get("score_100")
            cell = lambda v: (f"{v:.1f}" if isinstance(v, (int, float)) else "-")
            f.write(f"| {m} | {cell(p50)} | {cell(p95)} | {cell(qa)} | *[ Ã  noter ]* | "
                    f"{cell(go)} | {cell(cp)} |\n")
        f.write("\n> La colonne **QualitÃ© testeurs /5** se remplit Ã  la main (â‰¥ 3 testeurs, "
                "mÃªme cours). Le score **QualitÃ© auto /10** est un proxy structurel automatique.\n\n")
        f.write("## MÃ©thode de rÃ©fÃ©rence retenue (ADR-002)\n\n")
        ref = BENCHMARK_REFERENCE or "*[ Ã  choisir aprÃ¨s la phase initiale : latence / qualite / ressources / composite ]*"
        f.write(f"MÃ©thode unique conservÃ©e pour toutes les comparaisons ultÃ©rieures : **{ref}**.\n")

    print(f"\nTableau exportÃ© dans {EXPORT_PATH}.")


if __name__ == "__main__":
    main()
