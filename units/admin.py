from django.contrib import admin
from .models import Unit


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'register', 'description', 'founded_at', 'address', 'city',
        'state', 'email', 'phone_number', 'person_responsible', 'active'
        )
