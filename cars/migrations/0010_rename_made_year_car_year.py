# Generated by Django 5.0.1 on 2024-02-12 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0009_alter_car_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='made_year',
            new_name='year',
        ),
    ]
