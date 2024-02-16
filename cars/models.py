from django.db import models
from units.models import Unit


class Car(models.Model):
    name = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    color = models.CharField(max_length=200)
    km = models.CharField(max_length=20)
    unit = models.ForeignKey(Unit, related_name='unit', on_delete=models.PROTECT)
    chassis = models.CharField(max_length=17)
    price = models.CharField(max_length=10)
    image = models.ImageField(upload_to='cars/')

    def __str__(self):
        return f'{self.name} - {self.made_year}'
