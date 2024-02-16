from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cars.urls import car_router
from employees.urls import employee_router
from units.urls import unit_router


router = DefaultRouter()
# cars
router.registry.extend(car_router.registry)

# employees
router.registry.extend(employee_router.registry)

# units
router.registry.extend(unit_router.registry)

urlpatterns = [
    path('', include(router.urls)),
]
