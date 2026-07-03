"""
Modèles de l'app accounts.

[Note pédagogique] On garde le modèle User standard de Django (simple et
robuste), et on lui ajoute un Profil 1-pour-1 pour les infos métier qui ne sont
pas dans User — ici `email_verified` (l'utilisateur a-t-il cliqué le lien de
confirmation envoyé par email ?).

Choix d'architecture « email = identifiant » : à l'inscription, on met
username = email (voir SignupSerializer). Le login se fait donc par email, sans
backend d'authentification custom. C'est le compromis le plus simple pour un
kit pédagogique (un vrai produit utiliserait souvent un User personnalisé avec
USERNAME_FIELD = 'email').
"""

from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Informations complémentaires attachées à un utilisateur."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    # Validation "soft" : le compte fonctionne même si l'email n'est pas vérifié,
    # mais un bandeau invite l'utilisateur à cliquer le lien de confirmation.
    email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Profile<{self.user.email or self.user.username}>"


def get_or_create_profile(user) -> Profile:
    """Récupère (ou crée) le profil d'un utilisateur.

    Pratique pour les comptes créés AVANT l'ajout du modèle Profile (ils n'ont
    pas encore de profil) : on le crée à la volée plutôt que de planter.
    """
    profile, _ = Profile.objects.get_or_create(user=user)
    return profile


class DataRequest(models.Model):
    """Trace une demande d'accès aux données personnelles (SAR RGPD)."""

    class Status(models.TextChoices):
        RECEIVED = "received", "Reçue"
        PROCESSING = "processing", "En cours"
        RESPONDED = "responded", "Répondue"

    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="data_requests",
        help_text="Utilisateur ayant demandé l'export.",
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.RECEIVED)
    requested_format = models.CharField(max_length=20, default="json")
    responded_at = models.DateTimeField(null=True, blank=True)
    export_hash = models.CharField(max_length=64, blank=True, default="")
    export_filename = models.CharField(max_length=255, blank=True, default="")
    response_size = models.PositiveIntegerField(null=True, blank=True)
    error_message = models.TextField(blank=True, default="")

    class Meta:
        ordering = ["-requested_at"]
        verbose_name = "Demande d'accès aux données"
        verbose_name_plural = "Demandes d'accès aux données"

    def __str__(self) -> str:
        return f"SAR<{self.requester.email or self.requester.username}>/{self.status}"


class AuditEvent(models.Model):
    """Journal minimal des événements métier liés à un utilisateur."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="audit_events",
        help_text="Utilisateur concerné par l'événement.",
    )
    event_type = models.CharField(max_length=40)
    message = models.CharField(max_length=255, blank=True, default="")
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Événement d'audit"
        verbose_name_plural = "Événements d'audit"

    def __str__(self) -> str:
        return f"Audit<{self.user_id}:{self.event_type}>"


class TeacherSuggestion(models.Model):
    """Suggestion pédagogique laissée par un professeur pour un élève."""

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="written_teacher_suggestions",
        help_text="Professeur à l'origine de la suggestion.",
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_teacher_suggestions",
        help_text="Élève destinataire de la suggestion.",
    )
    title = models.CharField(max_length=120)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Suggestion pédagogique"
        verbose_name_plural = "Suggestions pédagogiques"

    def __str__(self) -> str:
        return f"Suggestion<{self.recipient_id}:{self.title}>"
