from rest_framework.viewsets import ModelViewSet
from .serializers import CarSerializer
from .models import Car


class CarsViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
