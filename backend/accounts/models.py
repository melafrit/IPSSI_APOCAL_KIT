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
    """Trace les demandes d'export des données personnelles (SAR - RGPD)."""

    STATUS_CHOICES = [
        ("received", "Reçue"),
        ("processing", "En cours"),
        ("completed", "Répondue"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="data_requests",
    )

    requested_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Date de création de la demande.",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="received",
        help_text="État de traitement de la demande.",
    )

    responded_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Date de réponse à la demande.",
    )

    export_hash = models.CharField(
        max_length=64,
        blank=True,
        help_text="Hash SHA-256 du fichier exporté.",
    )

    class Meta:
        verbose_name = "Demande d'export"
        verbose_name_plural = "Demandes d'export"

    def __str__(self) -> str:
        return f"DataRequest<{self.user.email}> - {self.status}"
