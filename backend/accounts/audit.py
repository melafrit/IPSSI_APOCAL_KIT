"""Helpers de journalisation métier pour les actions liées à un utilisateur."""

from django.contrib.auth.models import User

from .models import AuditEvent


def log_audit_event(user: User, event_type: str, message: str = "", payload: dict | None = None) -> None:
    """Enregistre un événement d'audit si l'utilisateur existe encore."""

    if user is None or not getattr(user, "pk", None):
        return

    AuditEvent.objects.create(
        user=user,
        event_type=event_type,
        message=message,
        payload=payload or {},
    )