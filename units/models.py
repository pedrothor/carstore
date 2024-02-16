from django.db import models


class Unit(models.Model):
    name = models.CharField(max_length=200)
    register = models.IntegerField()
    description = models.TextField()
    founded_at = models.DateField()
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    person_responsible = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='units')

    def __str__(self):
        return self.name
