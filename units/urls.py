from rest_framework.routers import DefaultRouter
from .views import UnitViewSet


unit_router = DefaultRouter()
unit_router.register('units', UnitViewSet, basename='units')

