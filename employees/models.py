from django.db import models
from units.models import Unit

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth = models.CharField(max_length=10)
    unit = models.ForeignKey(Unit, related_name='unit_employee', on_delete=models.PROTECT)
    address = models.CharField(max_length=200)
    civil_status = models.CharField(max_length=200)
    image = models.ImageField(upload_to='employees')

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.birth}'

