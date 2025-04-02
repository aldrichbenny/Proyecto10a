# Generated by Django 5.1.6 on 2025-04-02 01:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_historial_pedido_hora_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historial_pedido',
            name='hora',
            field=models.TimeField(default=datetime.time(18, 20, 37, 574157)),
        ),
        migrations.AlterField(
            model_name='historial_stock',
            name='hora_historial_stock',
            field=models.TimeField(default=datetime.time(18, 20, 37, 548552)),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='hora_registro',
            field=models.TimeField(default=datetime.time(18, 20, 37, 571855)),
        ),
    ]
