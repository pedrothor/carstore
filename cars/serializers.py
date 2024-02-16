from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    # além dos campos no model Car, adicione esse campo no retorno...
    unit_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Car
        fields = '__all__'

    # buscando o nome do objeto no campo 'unit'
    def get_unit_name(self, obj):  # esse obj é o próprio carro em questão
        name = obj.unit.name
        return name
