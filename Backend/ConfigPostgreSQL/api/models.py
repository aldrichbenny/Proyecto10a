from django.db import models
from django.utils import timezone #para la hora y tiempo real
# Create your models here.


class Roles(models.Model):
    ROL_CHOICES = (
        (1,'Cliente'),
        (2,'JefedeArea'),
        (3,'Administrador'),
    )
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.SmallIntegerField(choices=ROL_CHOICES)
    descripcion_rol = models.CharField(max_length=100)

    class Meta:
        db_table = 'roles'
    def __str__(self):
        return dict(self.ROL_CHOICES).get(self.nombre_rol, str(self.nombre_rol + self.id_rol))

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    correo = models.EmailField(max_length=50, unique=True)
    contraseña = models.CharField(max_length=100)
    id_rol = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_rol')

    class Meta:
        db_table = 'usuario'

    def __str__(self):
        return str(self.correo)
    
class Perfil(models.Model):
    id_perfil = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido_pat = models.CharField(max_length=50)
    apellido_mat = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10)
    direccion = models.CharField(max_length=100)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'perfil'

    def __str__(self):
        return self.nombre + ' ' + self.apellido_pat + ' ' + self.apellido_mat

class Preguntasseguridad(models.Model):
    ASK_CHOICES = (
        (1,'¿Donde naciste?'),
        (2,'¿Año que naciste?'),
        (3,'¿Nombre de un familiar?'),
        (4,'¿Color favorito?'),
        (5,'¿Numero favorito?'),
        (6,'¿Que edad tuviste en el 2010?'),
    )

    id_pregunta = models.AutoField(primary_key=True)
    pregunta1 = models.SmallIntegerField(choices=ASK_CHOICES)
    respuesta1 = models.CharField(max_length=50)
    pregunta2 = models.SmallIntegerField(choices=ASK_CHOICES)
    respuesta2 = models.CharField(max_length=50)
    pregunta3 = models.SmallIntegerField(choices=ASK_CHOICES)
    respuesta3 = models.CharField(max_length=50)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'preguntasseguridad'

    def __str__(self):
        return str(self.id_pregunta)
    
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50)
    descripcion_categoria = models.CharField(max_length=100)
    class Meta:
        db_table = 'categoria'
    def __str__(self):
        return self.nombre_categoria

class Productos(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=50)
    descripcion_producto = models.CharField(max_length=100)
    precio_producto = models.DecimalField(max_digits=8, decimal_places=2)
    imagen = models.CharField(max_length=100)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')

    class Meta:
        db_table = 'productos'
    def __str__(self):
        return self.nombre_producto
    
class Talla(models.Model):
    id_talla = models.AutoField(primary_key=True)
    nombre_talla = models.CharField(max_length=50)
    cantidad = models.IntegerField(default=0)
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, db_column='id_producto')

    class Meta:
        db_table = 'talla'
    def __str__(self):
        return self.nombre_talla
    
class Colores(models.Model):
    id_color = models.AutoField(primary_key=True)
    nombre_color = models.CharField(max_length=50)
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')

    class Meta:
        db_table = 'colores'
    def __str__(self):
        return self.nombre_color
    
class Stock(models.Model):
    id_stock = models.AutoField(primary_key=True)
    cantidad_actual = models.IntegerField(default=0)
    cantidad_eliminada = models.IntegerField(default=0)
    cantidad_agregada = models.IntegerField(default=0)
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')

    class Meta:
        db_table = 'stock'
    def __str__(self):
        return self.id_stock
    
class Historial_stock(models.Model):
    id_historial_stock = models.AutoField(primary_key=True)
    cantidad = models.IntegerField()
    descripcion_historial_stock = models.CharField(max_length=100)
    fecha_historial_stock = models.DateField(default=timezone.now)
    hora_historial_stock = models.TimeField(default=timezone.now)
    id_stock = models.ForeignKey(Stock, on_delete=models.CASCADE, db_column='id_stock')

    class Meta:
        db_table = 'historial_stock'
    def __str__(self):
        return self.id_historial_stock

#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////

class Solicitud(models.Model):
    id_solicitud = models.AutoField(primary_key=True)
    fecha_registro = models.DateField(default=timezone.now) 
    hora_registro = models.TimeField(default=timezone.now)
    fecha_entrega_estimada = models.DateField(default=timezone.now) 
    estado_solicitud = models.CharField(max_length=20)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'solicitud'
        constraints = [
            models.CheckConstraint(check=models.Q(estado_solicitud__in=['ENREVISION', 'CORTE', 'EMBALAJE', 'ENVIADO']), name='estado_solicitud')
        ]
    def __str__(self):
        return self.id_solicitud
    
class Solicitud_producto(models.Model):
    id_solicitud_producto = models.AutoField(primary_key=True)
    cantidad_total = models.IntegerField(default=0)
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, db_column='id_producto')
    id_solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE, db_column='id_solicitud')

    class Meta:
        db_table = 'solicitud_producto'
        constraints = [
            models.CheckConstraint(check=models.Q(cantidad_total__gte=0),  name='solicitud_cantidad_total'),
        ]
    def __str__(self):
        return self.id_solicitud_producto

class Area(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre_area = models.CharField(max_length=50)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'area'
    def __str__(self):
        return self.nombre_area
    
class Trabajo(models.Model):
    id_trabajo = models.AutoField(primary_key=True)
    descripcion_trabajo = models.CharField(max_length=100)
    id_area = models.ForeignKey(Area, on_delete=models.CASCADE, db_column='id_area')

    class Meta:
        db_table = 'trabajo'
    def __str__(self):
        return self.id_trabajo

class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    estado_pedido  = models.CharField(max_length=20) 
    cantidad_total = models.IntegerField(default=0)  
    id_solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE, db_column='id_solicitud')
    id_area = models.ForeignKey(Area, on_delete=models.CASCADE, db_column='id_area')

    class Meta:
        db_table = 'pedido'
        constraints = [
            models.CheckConstraint(check=models.Q(cantidad_total__gte=0),  name='pedido_cantidad_total'),
            models.CheckConstraint(check=models.Q(estado_pedido__in=['ENREVISION', 'CORTE', 'EMBALAJE', 'ENVIADO']), name='pedido_estado_solicitud')
        ]
    def __str__(self):
        return self.id_pedido

class Historial_pedido(models.Model):
    id_historial_pedido = models.AutoField(primary_key=True)
    estado_seguimiento = models.CharField(max_length=20) 
    fecha = models.DateField(default=timezone.now)      
    hora = models.TimeField(default=timezone.now)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='id_pedido')

    class Meta:
        db_table = 'historial_pedido'
        constraints = [
            models.CheckConstraint(check=models.Q(estado_seguimiento__in=['ENREVISION', 'CORTE', 'EMBALAJE', 'ENVIADO']), name='historial_estado_solicitud')
        ]
    def __str__(self):
        return self.id_historial_pedido

