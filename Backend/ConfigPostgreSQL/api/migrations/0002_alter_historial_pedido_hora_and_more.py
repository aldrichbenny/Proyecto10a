# Generated by Django 5.1.6 on 2025-04-02 01:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historial_pedido',
            name='hora',
            field=models.TimeField(default=datetime.time(18, 20, 23, 793812)),
        ),
        migrations.AlterField(
            model_name='historial_stock',
            name='hora_historial_stock',
            field=models.TimeField(default=datetime.time(18, 20, 23, 766161)),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='hora_registro',
            field=models.TimeField(default=datetime.time(18, 20, 23, 791445)),
        ),
    ]
