"""Admin des comptes et de la conformité RGPD."""

from django.contrib import admin

from .models import AuditEvent, DataRequest, Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
	list_display = ["user", "email_verified", "created_at"]
	search_fields = ["user__email", "user__username"]
	list_filter = ["email_verified", "created_at"]


@admin.register(DataRequest)
class DataRequestAdmin(admin.ModelAdmin):
	list_display = ["requester", "status", "requested_format", "requested_at", "responded_at"]
	search_fields = ["requester__email", "requester__username", "export_hash"]
	list_filter = ["status", "requested_format", "requested_at"]


@admin.register(AuditEvent)
class AuditEventAdmin(admin.ModelAdmin):
	list_display = ["user", "event_type", "message", "created_at"]
	search_fields = ["user__email", "user__username", "event_type", "message"]
	list_filter = ["event_type", "created_at"]
