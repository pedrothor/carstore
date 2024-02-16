# Generated by Django 5.0.1 on 2024-01-30 18:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0001_initial'),
        ('units', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='unit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='unit_employee', to='units.unit'),
        ),
    ]
