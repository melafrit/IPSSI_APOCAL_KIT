from django.contrib import admin

from .models import DataRequest, Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "email_verified",
        "created_at",
    )
    search_fields = (
        "user__email",
        "user__username",
    )


@admin.register(DataRequest)
class DataRequestAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "status",
        "requested_at",
        "responded_at",
    )
    list_filter = ("status",)
    search_fields = (
        "user__email",
        "user__username",
    )
