# Generated by Django 5.1.6 on 2025-04-01 14:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_historial_pedido_hora_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historial_pedido',
            name='hora',
            field=models.TimeField(default=datetime.time(7, 0, 34, 760826)),
        ),
        migrations.AlterField(
            model_name='historial_stock',
            name='hora_historial_stock',
            field=models.TimeField(default=datetime.time(7, 0, 34, 739724)),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='hora_registro',
            field=models.TimeField(default=datetime.time(7, 0, 34, 758831)),
        ),
    ]
