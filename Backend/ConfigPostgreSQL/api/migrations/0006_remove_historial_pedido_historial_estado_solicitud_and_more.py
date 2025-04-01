# Generated by Django 5.1.6 on 2025-04-01 18:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_historial_pedido_estado_seguimiento_and_more'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='historial_pedido',
            name='historial_estado_solicitud',
        ),
        migrations.RemoveConstraint(
            model_name='pedido',
            name='pedido_estado_solicitud',
        ),
        migrations.RemoveConstraint(
            model_name='solicitud',
            name='estado_solicitud',
        ),
        migrations.AlterField(
            model_name='historial_pedido',
            name='hora',
            field=models.TimeField(default=datetime.time(11, 29, 17, 12398)),
        ),
        migrations.AlterField(
            model_name='historial_stock',
            name='hora_historial_stock',
            field=models.TimeField(default=datetime.time(11, 29, 16, 998543)),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='hora_registro',
            field=models.TimeField(default=datetime.time(11, 29, 17, 10427)),
        ),
        migrations.AddConstraint(
            model_name='historial_pedido',
            constraint=models.CheckConstraint(condition=models.Q(('estado_seguimiento__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'CUT-OFF-PENDING', 'CUT-OFF-ACCEPTED', 'PACKAGING', 'PACKAGING-PENDING', 'PACKAGING-ACCEPTED', 'SHIPPED', 'CANCELLED'])), name='historial_estado_solicitud'),
        ),
        migrations.AddConstraint(
            model_name='pedido',
            constraint=models.CheckConstraint(condition=models.Q(('estado_pedido__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'CUT-OFF-PENDING', 'CUT-OFF-ACCEPTED', 'PACKAGING', 'PACKAGING-PENDING', 'PACKAGING-ACCEPTED', 'SHIPPED', 'CANCELLED'])), name='pedido_estado_solicitud'),
        ),
        migrations.AddConstraint(
            model_name='solicitud',
            constraint=models.CheckConstraint(condition=models.Q(('estado_solicitud__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'CUT-OFF-PENDING', 'CUT-OFF-ACCEPTED', 'PACKAGING', 'PACKAGING-PENDING', 'PACKAGING-ACCEPTED', 'SHIPPED', 'CANCELLED'])), name='estado_solicitud'),
        ),
    ]
