"""
Endpoints LLM :
    GET  /api/llm/ping/           — vérifie l'intégration Ollama
    POST /api/llm/generate-quiz/  — génère un quiz à partir d'un PDF ou d'un texte
"""

import requests
from django.conf import settings
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from quizzes.models import Question, Quiz
from quizzes.serializers import QuizSerializer

from accounts.audit import log_audit_event

from .pdf_utils import PDFError, extract_text_from_pdf
from .serializers import GenerateQuizSerializer
from .services import get_llm_client
from .services.base import LLMError


class PingView(APIView):
    """Vérifie que le backend voit Ollama (ou que le mock répond)."""

    permission_classes = [AllowAny]

    @extend_schema(
        responses={200: OpenApiResponse(description="{ backend, model, ollama_alive, message }")},
        description="Ping LLM — utile pour vérifier l'intégration Ollama.",
    )
    def get(self, _request):
        # Config EFFECTIVE (base prioritaire, repli .env) — Lot 8.
        from .services.factory import resolve_active

        conf = resolve_active()
        backend = conf["backend"]

        if backend == "mock":
            return Response(
                {
                    "backend": "mock",
                    "model": "mock-model",
                    "ollama_alive": False,
                    "message": "Mock LLM actif (choisissez un autre fournisseur dans l'admin).",
                }
            )

        if backend != "ollama":
            # Backend cloud : pas de ping HTTP ici (éviter de consommer du quota).
            return Response(
                {
                    "backend": backend,
                    "model": conf["model"],
                    "message": f"Backend cloud « {backend} » configuré.",
                }
            )

        host = conf["ollama_host"] or settings.OLLAMA_HOST
        model = conf["model"] or settings.OLLAMA_MODEL
        try:
            resp = requests.get(f"{host}/api/tags", timeout=2)
            resp.raise_for_status()
            tags = resp.json().get("models", [])
            target = model.split(":")[0]
            model_present = any(m.get("name", "").startswith(target) for m in tags)
            return Response(
                {
                    "backend": "ollama",
                    "model": model,
                    "ollama_alive": True,
                    "model_loaded": model_present,
                    "message": (
                        "Ollama répond ✓"
                        if model_present
                        else f"Ollama répond mais le modèle {model} n'est pas téléchargé. "
                        "Lancez : make pull-model"
                    ),
                }
            )
        except requests.RequestException as exc:
            return Response(
                {
                    "backend": "ollama",
                    "model": model,
                    "ollama_alive": False,
                    "message": f"Ollama injoignable : {exc}",
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

import sys
import threading
from django.db import close_old_connections, transaction


def generate_quiz_async(quiz_id, source_text, title, is_testing=False):
    """Effectue la génération de quiz de façon asynchrone dans un thread."""
    try:
        # Assurer que les connexions de thread Django sont propres (hors tests)
        if not is_testing:
            close_old_connections()

        try:
            quiz = Quiz.objects.get(pk=quiz_id)
        except Quiz.DoesNotExist:
            return

        # Étape 2 (20%) : Début de l'analyse / Envoi du cours à l'IA
        quiz.status = "processing"
        quiz.progress_step = 2
        quiz.save(update_fields=["status", "progress_step"])

        log_audit_event(
            quiz.user,
            "quiz_generation_started",
            "Génération de quiz lancée",
            {"quiz_id": quiz.id, "title": title},
        )

        # Étape 3 (40%) : Génération par l'IA
        quiz.progress_step = 3
        quiz.save(update_fields=["progress_step"])

        client = get_llm_client()
        questions_data = client.generate_quiz(source_text=source_text, title=title)

        # Étape 4 (80%) : Persistance des questions
        quiz.progress_step = 4
        quiz.save(update_fields=["progress_step"])

        with transaction.atomic():
            questions = [
                Question(
                    quiz=quiz,
                    index=i,
                    prompt=q["prompt"],
                    options=q["options"],
                    correct_index=q["correct_index"],
                )
                for i, q in enumerate(questions_data, start=1)
            ]
            Question.objects.bulk_create(questions)

            # Étape 5 (100%) : Terminé avec succès
            quiz.status = "completed"
            quiz.progress_step = 5
            quiz.save(update_fields=["status", "progress_step", "updated_at"])

        log_audit_event(
            quiz.user,
            "quiz_generation_completed",
            "Quiz généré avec succès",
            {"quiz_id": quiz.id, "questions": len(questions_data)},
        )

    except Exception as exc:
        if not is_testing:
            close_old_connections()
        try:
            quiz = Quiz.objects.get(pk=quiz_id)
            quiz.status = "failed"
            quiz.progress_step = 0
            quiz.error_message = str(exc)
            quiz.save(update_fields=["status", "progress_step", "error_message"])

            log_audit_event(
                quiz.user,
                "quiz_generation_failed",
                "Échec de la génération de quiz",
                {"quiz_id": quiz.id, "error": str(exc)},
            )
        except Exception:
            pass
    finally:
        if not is_testing:
            close_old_connections()


class GenerateQuizView(APIView):
    """Génère un quiz de 10 QCM à partir d'un PDF ou d'un texte collé."""

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @extend_schema(
        request=GenerateQuizSerializer,
        responses={201: QuizSerializer},
        description=(
            "Génère 10 QCM à partir d'un cours. Fournir soit `pdf` (multipart) "
            "soit `source_text` (≥ 200 caractères). Le quiz est sauvegardé en "
            "DB et associé à l'utilisateur connecté."
        ),
    )
    def post(self, request):
        # Lot 8 : si l'admin exige un email vérifié, on bloque sinon.
        from accounts.models import get_or_create_profile
        from administration.models import SiteConfig

        if (
            SiteConfig.load().require_email_verification
            and not get_or_create_profile(request.user).email_verified
        ):
            return Response(
                {"detail": "Veuillez confirmer votre adresse email avant de générer un quiz."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = GenerateQuizSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        title = serializer.validated_data["title"]
        pdf_file = serializer.validated_data.get("pdf")
        source_text = (serializer.validated_data.get("source_text") or "").strip()

        # 1. Extraction du texte source
        if pdf_file:
            try:
                source_text = extract_text_from_pdf(pdf_file)
            except PDFError as exc:
                return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Création initiale du Quiz (statut: pending, progress_step: 1)
        quiz = Quiz.objects.create(
            user=request.user,
            title=title,
            source_text=source_text,
            status="pending",
            progress_step=1,
        )

        log_audit_event(
            request.user,
            "quiz_requested",
            "Quiz demandé",
            {"quiz_id": quiz.id, "title": title, "has_pdf": bool(pdf_file)},
        )

        # 3. Déclenchement asynchrone (ou synchrone en cas de tests unitaires)
        is_testing = "test" in sys.argv or any("pytest" in arg for arg in sys.argv)
        if is_testing:
            generate_quiz_async(quiz.id, source_text, title, is_testing=is_testing)
            quiz.refresh_from_db()
        else:
            thread = threading.Thread(
                target=generate_quiz_async,
                args=(quiz.id, source_text, title),
                daemon=True,
            )
            thread.start()

        return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)
