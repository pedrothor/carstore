from django.db import models
from units.models import Unit

CIVIL_STATUS = [
    ('single', 'Single'),
    ('married', 'Married'),
    ('divorced', 'Divorced'),
    ('widowed', 'Widowed'),
    ('engaged', 'Engaged'),
    ('common-law marriage', 'Common-law marriage'),
]


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth = models.DateField()
    unit = models.ForeignKey(Unit, related_name='unit_employee', on_delete=models.PROTECT)
    address = models.CharField(max_length=200)
    civil_status = models.CharField(max_length=200, choices=CIVIL_STATUS)
    image = models.ImageField(upload_to='employees')

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.birth}'

