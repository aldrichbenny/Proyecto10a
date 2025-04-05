# Generated by Django 5.1.6 on 2025-04-01 22:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_historial_pedido_historial_estado_solicitud_and_more'),
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
            name='estado_seguimiento',
            field=models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('CUT-OFF-PENDING', 'CUT-OFF-PENDING'), ('CUT-OFF-ACCEPTED', 'CUT-OFF-ACCEPTED'), ('PACKAGING-PENDING', 'PACKAGING-PENDING'), ('PACKAGING-ACCEPTED', 'PACKAGING-ACCEPTED'), ('SHIPPED', 'SHIPPED'), ('CANCELLED', 'CANCELLED')], max_length=20),
        ),
        migrations.AlterField(
            model_name='historial_pedido',
            name='hora',
            field=models.TimeField(default=datetime.time(15, 53, 36, 242049)),
        ),
        migrations.AlterField(
            model_name='historial_stock',
            name='hora_historial_stock',
            field=models.TimeField(default=datetime.time(15, 53, 36, 224040)),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='estado_pedido',
            field=models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('CUT-OFF-PENDING', 'CUT-OFF-PENDING'), ('CUT-OFF-ACCEPTED', 'CUT-OFF-ACCEPTED'), ('PACKAGING-PENDING', 'PACKAGING-PENDING'), ('PACKAGING-ACCEPTED', 'PACKAGING-ACCEPTED'), ('SHIPPED', 'SHIPPED'), ('CANCELLED', 'CANCELLED')], max_length=20),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='estado_solicitud',
            field=models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('CUT-OFF-PENDING', 'CUT-OFF-PENDING'), ('CUT-OFF-ACCEPTED', 'CUT-OFF-ACCEPTED'), ('PACKAGING-PENDING', 'PACKAGING-PENDING'), ('PACKAGING-ACCEPTED', 'PACKAGING-ACCEPTED'), ('SHIPPED', 'SHIPPED'), ('CANCELLED', 'CANCELLED')], max_length=20),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='hora_registro',
            field=models.TimeField(default=datetime.time(15, 53, 36, 236049)),
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
