# Generated by Django 5.1.6 on 2025-03-14 01:16

import datetime
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id_area', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_area', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'area',
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_categoria', models.CharField(max_length=50, unique=True)),
                ('descripcion_categoria', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'categoria',
            },
        ),
        migrations.CreateModel(
            name='Colores',
            fields=[
                ('id_color', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_color', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'colores',
            },
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rol', models.CharField(choices=[('Customer', 'Customer'), ('AreaManager', 'Area Manager'), ('Administrator', 'Administrator')], max_length=20, unique=True)),
                ('descripcion_rol', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'roles',
            },
        ),
        migrations.CreateModel(
            name='Solicitud',
            fields=[
                ('id_solicitud', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_registro', models.DateField(default=django.utils.timezone.localdate)),
                ('hora_registro', models.TimeField(default=datetime.time(18, 16, 32, 704203))),
                ('fecha_entrega_estimada', models.DateField(default=django.utils.timezone.localdate)),
                ('estado_solicitud', models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('SHIPPED', 'SHIPPED')], max_length=20)),
            ],
            options={
                'db_table': 'solicitud',
            },
        ),
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id_producto', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_producto', models.CharField(max_length=50)),
                ('descripcion_producto', models.CharField(max_length=100)),
                ('precio_producto', models.DecimalField(decimal_places=2, max_digits=8)),
                ('imagen', models.CharField(max_length=100)),
                ('id_categoria', models.ForeignKey(db_column='id_categoria', on_delete=django.db.models.deletion.CASCADE, to='api.categoria')),
            ],
            options={
                'db_table': 'productos',
            },
        ),
        migrations.CreateModel(
            name='Solicitud_producto',
            fields=[
                ('id_solicitud_producto', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad_total', models.IntegerField(default=0)),
                ('id_solicitud', models.ForeignKey(db_column='id_solicitud', on_delete=django.db.models.deletion.CASCADE, to='api.solicitud')),
            ],
            options={
                'db_table': 'solicitud_producto',
            },
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id_pedido', models.AutoField(primary_key=True, serialize=False)),
                ('estado_pedido', models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('SHIPPED', 'SHIPPED')], max_length=20)),
                ('cantidad_total', models.IntegerField(default=0)),
                ('id_area', models.ForeignKey(db_column='id_area', on_delete=django.db.models.deletion.CASCADE, to='api.area')),
                ('id_solicitud_producto', models.ForeignKey(db_column='id_solicitud_producto', on_delete=django.db.models.deletion.CASCADE, to='api.solicitud_producto')),
            ],
            options={
                'db_table': 'pedido',
            },
        ),
        migrations.CreateModel(
            name='Talla',
            fields=[
                ('id_talla', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_talla', models.CharField(max_length=50)),
                ('cantidad', models.IntegerField(default=0)),
                ('id_color', models.ForeignKey(db_column='id_color', on_delete=django.db.models.deletion.CASCADE, to='api.colores')),
                ('id_producto', models.ForeignKey(db_column='id_producto', on_delete=django.db.models.deletion.CASCADE, to='api.productos')),
            ],
            options={
                'db_table': 'talla',
            },
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id_stock', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad_actual', models.IntegerField(default=0)),
                ('cantidad_eliminada', models.IntegerField(default=0)),
                ('cantidad_agregada', models.IntegerField(default=0)),
                ('id_talla', models.ForeignKey(db_column='id_talla', on_delete=django.db.models.deletion.CASCADE, to='api.talla')),
            ],
            options={
                'db_table': 'stock',
            },
        ),
        migrations.AddField(
            model_name='solicitud_producto',
            name='id_talla',
            field=models.ForeignKey(db_column='id_talla', on_delete=django.db.models.deletion.CASCADE, to='api.talla'),
        ),
        migrations.CreateModel(
            name='Historial_stock',
            fields=[
                ('id_historial_stock', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('descripcion_historial_stock', models.CharField(max_length=100)),
                ('fecha_historial_stock', models.DateField(default=django.utils.timezone.localdate)),
                ('hora_historial_stock', models.TimeField(default=datetime.time(18, 16, 32, 693847))),
                ('id_talla', models.ForeignKey(db_column='id_talla', on_delete=django.db.models.deletion.CASCADE, to='api.talla')),
            ],
            options={
                'db_table': 'historial_stock',
            },
        ),
        migrations.CreateModel(
            name='Trabajo',
            fields=[
                ('id_trabajo', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion_trabajo', models.CharField(max_length=100)),
                ('id_area', models.ForeignKey(db_column='id_area', on_delete=django.db.models.deletion.CASCADE, to='api.area')),
            ],
            options={
                'db_table': 'trabajo',
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('correo', models.EmailField(max_length=50, unique=True)),
                ('contraseña', models.CharField(max_length=100)),
                ('id_rol', models.ForeignKey(db_column='id_rol', on_delete=django.db.models.deletion.CASCADE, to='api.roles')),
            ],
            options={
                'db_table': 'usuario',
            },
        ),
        migrations.AddField(
            model_name='solicitud',
            name='id_usuario',
            field=models.ForeignKey(db_column='id_usuario', on_delete=django.db.models.deletion.CASCADE, to='api.usuario'),
        ),
        migrations.CreateModel(
            name='Preguntasseguridad',
            fields=[
                ('id_pregunta', models.AutoField(primary_key=True, serialize=False)),
                ('pregunta1', models.CharField(choices=[('Where were you born?', 'Where were you born?'), ('What year were you born?', 'What year were you born?'), ('Name of a relative?', 'Name of a relative?'), ('Favorite color?', 'Favorite color?'), ('Favorite number?', 'Favorite number?'), ('How old were you in 2010?', 'How old were you in 2010?')], max_length=50)),
                ('respuesta1', models.CharField(max_length=50)),
                ('pregunta2', models.CharField(choices=[('Where were you born?', 'Where were you born?'), ('What year were you born?', 'What year were you born?'), ('Name of a relative?', 'Name of a relative?'), ('Favorite color?', 'Favorite color?'), ('Favorite number?', 'Favorite number?'), ('How old were you in 2010?', 'How old were you in 2010?')], max_length=50)),
                ('respuesta2', models.CharField(max_length=50)),
                ('pregunta3', models.CharField(choices=[('Where were you born?', 'Where were you born?'), ('What year were you born?', 'What year were you born?'), ('Name of a relative?', 'Name of a relative?'), ('Favorite color?', 'Favorite color?'), ('Favorite number?', 'Favorite number?'), ('How old were you in 2010?', 'How old were you in 2010?')], max_length=50)),
                ('respuesta3', models.CharField(max_length=50)),
                ('id_usuario', models.ForeignKey(db_column='id_usuario', on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
            options={
                'db_table': 'preguntasseguridad',
            },
        ),
        migrations.CreateModel(
            name='Perfil',
            fields=[
                ('id_perfil', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido_pat', models.CharField(max_length=50)),
                ('apellido_mat', models.CharField(max_length=50)),
                ('telefono', models.CharField(max_length=10)),
                ('direccion', models.CharField(max_length=100)),
                ('id_usuario', models.ForeignKey(db_column='id_usuario', on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
            options={
                'db_table': 'perfil',
            },
        ),
        migrations.AddField(
            model_name='area',
            name='id_usuario',
            field=models.ForeignKey(db_column='id_usuario', on_delete=django.db.models.deletion.CASCADE, to='api.usuario'),
        ),
        migrations.CreateModel(
            name='Historial_pedido',
            fields=[
                ('id_historial_pedido', models.AutoField(primary_key=True, serialize=False)),
                ('estado_seguimiento', models.CharField(choices=[('IN REVIEW', 'IN REVIEW'), ('PENDING', 'PENDING'), ('CUT-OFF', 'CUT-OFF'), ('PACKAGING', 'PACKAGING'), ('SHIPPED', 'SHIPPED')], max_length=20)),
                ('fecha', models.DateField(default=django.utils.timezone.localdate)),
                ('hora', models.TimeField(default=datetime.time(18, 16, 32, 706728))),
                ('id_pedido', models.ForeignKey(db_column='id_pedido', on_delete=django.db.models.deletion.CASCADE, to='api.pedido')),
            ],
            options={
                'db_table': 'historial_pedido',
                'constraints': [models.CheckConstraint(condition=models.Q(('estado_seguimiento__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED'])), name='historial_estado_solicitud')],
            },
        ),
        migrations.AddConstraint(
            model_name='pedido',
            constraint=models.CheckConstraint(condition=models.Q(('cantidad_total__gte', 0)), name='pedido_cantidad_total'),
        ),
        migrations.AddConstraint(
            model_name='pedido',
            constraint=models.CheckConstraint(condition=models.Q(('estado_pedido__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED'])), name='pedido_estado_solicitud'),
        ),
        migrations.AddConstraint(
            model_name='talla',
            constraint=models.CheckConstraint(condition=models.Q(('cantidad__gte', 0)), name='talla_cantidad_no_negativa'),
        ),
        migrations.AlterUniqueTogether(
            name='talla',
            unique_together={('nombre_talla', 'id_producto', 'id_color')},
        ),
        migrations.AddConstraint(
            model_name='solicitud_producto',
            constraint=models.CheckConstraint(condition=models.Q(('cantidad_total__gte', 0)), name='solicitud_cantidad_total'),
        ),
        migrations.AddConstraint(
            model_name='solicitud',
            constraint=models.CheckConstraint(condition=models.Q(('estado_solicitud__in', ['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED'])), name='estado_solicitud'),
        ),
    ]
