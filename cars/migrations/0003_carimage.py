# Generated by Django 5.0.1 on 2024-01-30 22:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0002_alter_car_unit'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='car_images/')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='images', to='cars.car')),
            ],
        ),
    ]