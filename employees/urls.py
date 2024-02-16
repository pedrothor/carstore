from .views import EmployeeViewSet
from rest_framework.routers import DefaultRouter

employee_router = DefaultRouter()
employee_router.register('employees', EmployeeViewSet, basename='employees')
