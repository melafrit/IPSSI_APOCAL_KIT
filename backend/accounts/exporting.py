"""Construction des exports RGPD (JSON / ZIP) pour un utilisateur."""

from __future__ import annotations

import io
import json
import zipfile
from dataclasses import dataclass
from hashlib import sha256

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.utils import timezone

from quizzes.models import Question, Quiz

from .models import AuditEvent, DataRequest, get_or_create_profile


@dataclass(slots=True)
class ExportArtifact:
    content: bytes
    content_type: str
    filename: str
    sha256_hex: str


def _user_payload(user: User) -> dict:
    profile = get_or_create_profile(user)
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "date_joined": user.date_joined,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "profile": {
            "email_verified": profile.email_verified,
            "created_at": profile.created_at,
        },
    }


def _quizzes_payload(user: User) -> list[dict]:
    quizzes = (
        Quiz.objects.filter(user=user)
        .annotate(question_count=Count("questions"))
        .prefetch_related("questions")
        .order_by("-created_at")
    )
    items: list[dict] = []
    for quiz in quizzes:
        items.append(
            {
                "id": quiz.id,
                "title": quiz.title,
                "source_text": quiz.source_text,
                "score": quiz.score,
                "status": quiz.status,
                "progress_step": quiz.progress_step,
                "error_message": quiz.error_message,
                "created_at": quiz.created_at,
                "updated_at": quiz.updated_at,
                "question_count": getattr(quiz, "question_count", quiz.questions.count()),
                "questions": [
                    {
                        "index": question.index,
                        "prompt": question.prompt,
                        "options": question.options,
                        "correct_index": question.correct_index,
                        "selected_index": question.selected_index,
                    }
                    for question in quiz.questions.all()
                ],
            }
        )
    return items


def _questions_payload(user: User) -> list[dict]:
    return [
        {
            "quiz_id": question.quiz_id,
            "quiz_title": question.quiz.title,
            "index": question.index,
            "prompt": question.prompt,
            "options": question.options,
            "correct_index": question.correct_index,
            "selected_index": question.selected_index,
        }
        for question in Question.objects.filter(quiz__user=user).select_related("quiz").order_by(
            "-quiz__created_at", "index"
        )
    ]


def _answers_payload(user: User) -> list[dict]:
    return [
        {
            "quiz_id": question.quiz_id,
            "quiz_title": question.quiz.title,
            "index": question.index,
            "selected_index": question.selected_index,
            "correct_index": question.correct_index,
            "correct": question.selected_index == question.correct_index,
        }
        for question in Question.objects.filter(
            quiz__user=user, selected_index__isnull=False
        ).select_related("quiz").order_by("-quiz__created_at", "index")
    ]


def _reports_payload(user: User) -> list[dict]:
    # Aucun modèle de signalement dédié n'existe encore dans le projet.
    # Le SAR expose donc une liste vide plutôt qu'une fausse donnée.
    return []


def _audit_events_payload(user: User) -> list[dict]:
    return [
        {
            "event_type": event.event_type,
            "message": event.message,
            "payload": event.payload,
            "created_at": event.created_at,
        }
        for event in AuditEvent.objects.filter(user=user).order_by("-created_at")
    ]


def _data_requests_payload(user: User) -> list[dict]:
    return [
        {
            "requested_at": request.requested_at,
            "status": request.status,
            "requested_format": request.requested_format,
            "responded_at": request.responded_at,
            "export_hash": request.export_hash,
            "export_filename": request.export_filename,
            "response_size": request.response_size,
            "error_message": request.error_message,
        }
        for request in DataRequest.objects.filter(requester=user).order_by("-requested_at")
    ]


def build_export_payload(user: User) -> dict:
    """Construit l'objet JSON complet exportable pour le compte donné."""

    return {
        "exported_at": timezone.now(),
        "account": _user_payload(user),
        "quizzes": _quizzes_payload(user),
        "questions": _questions_payload(user),
        "answers": _answers_payload(user),
        "reports": _reports_payload(user),
        "audit_logs": _audit_events_payload(user),
        "data_requests": _data_requests_payload(user),
    }


def build_export_artifact(user: User, output_format: str = "json") -> tuple[dict, ExportArtifact]:
    """Construit les données et le fichier exporté dans le format demandé."""

    payload = build_export_payload(user)
    if output_format == "zip":
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
            for name, content in payload.items():
                archive.writestr(
                    f"{name}.json",
                    json.dumps(content, ensure_ascii=False, indent=2, cls=DjangoJSONEncoder),
                )
        content = buffer.getvalue()
        filename = f"edututor-ia-export-{user.username}.zip"
        return payload, ExportArtifact(
            content=content,
            content_type="application/zip",
            filename=filename,
            sha256_hex=sha256(content).hexdigest(),
        )

    content = json.dumps(payload, ensure_ascii=False, indent=2, cls=DjangoJSONEncoder).encode(
        "utf-8"
    )
    filename = f"edututor-ia-export-{user.username}.json"
    return payload, ExportArtifact(
        content=content,
        content_type="application/json",
        filename=filename,
        sha256_hex=sha256(content).hexdigest(),
    )