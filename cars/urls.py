from rest_framework.routers import DefaultRouter
from .views import CarsViewSet


car_router = DefaultRouter()
car_router.register(r'cars', CarsViewSet, basename='cars')

# urlpatterns = [
#     path('cars/', CarsListCreateView.as_view(), name='cars-list-create'),
#     path('cars/<int:pk>/', CarsReatrieveUpdateDestroyView.as_view(), name='cars-details')
# ]
