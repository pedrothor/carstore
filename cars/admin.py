from django.contrib import admin
from .models import Car


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'year', 'color', 'km', 'chassis', 'price', 'unit', 'image')
