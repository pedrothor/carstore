# Generated by Django 5.0.1 on 2024-01-16 19:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('units', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('made_year', models.CharField(max_length=4)),
                ('color', models.CharField(choices=[('white', 'White'), ('blue', 'Blue'), ('red', 'Red'), ('yellow', 'Yellow'), ('brown', 'Brown'), ('black', 'Black'), ('grey', 'Grey'), ('purple', 'Purple'), ('green', 'Green')], max_length=200)),
                ('km', models.CharField(max_length=20)),
                ('chassis', models.CharField(max_length=17)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='units.unit')),
            ],
        ),
    ]
