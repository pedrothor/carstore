# Generated by Django 5.0.1 on 2024-03-18 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_alter_employee_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='civil_status',
            field=models.CharField(max_length=200),
        ),
    ]
