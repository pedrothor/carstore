from rest_framework.viewsets import ModelViewSet
from .serializers import UnitSerializer
from .models import Unit


class UnitViewSet(ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
