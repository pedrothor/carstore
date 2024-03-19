from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    # além dos campos no model Employee, adicione esse campo no retorno...
    unit_name = serializers.SerializerMethodField(read_only=True)
    birth_modified = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

    # buscando o nome do objeto no campo 'unit'
    def get_unit_name(self, obj):  # esse obj é o próprio employee em questão
        name = obj.unit.name
        return name

    def get_birth_modified(self, obj):
        birth = obj.birth
        return birth