# Generated by Django 5.0.1 on 2024-02-12 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0007_alter_car_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='color',
            field=models.CharField(max_length=200),
        ),
    ]