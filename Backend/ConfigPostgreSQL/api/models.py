from django.db import models
from django.utils import timezone 
from django.core.exceptions import ValidationError
import bcrypt

# Create your models here.


class Roles(models.Model):
    ROL_CHOICES = (
        ('Customer', 'Customer'),
        ('AreaManager', 'Area Manager'),
        ('Administrator', 'Administrator'),
    )
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=20, choices=ROL_CHOICES, unique=True)
    descripcion_rol = models.CharField(max_length=100)

    class Meta:
        db_table = 'roles'
    def __str__(self):
        return str(self.nombre_rol)
    
#////////////////////////////////////////////////////
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    correo = models.EmailField(max_length=50, unique=True)
    contraseña = models.CharField(max_length=128)
    id_rol = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_rol')

    def set_password(self, raw_password):
        salt = bcrypt.gensalt()
        self.contraseña = bcrypt.hashpw(raw_password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, raw_password):
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contraseña.encode('utf-8'))

    class Meta:
        db_table = 'usuario'

    def __str__(self):
        return str(self.correo)
#////////////////////////////////////////////////////
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
        return str(self.nombre + ' ' + self.apellido_pat + ' ' + self.apellido_mat)

class Preguntasseguridad(models.Model):
    ASK_CHOICES = (
        ('Where were you born?', 'Where were you born?'),
        ('What year were you born?', 'What year were you born?'),
        ('Name of a relative?', 'Name of a relative?'),
        ('Favorite color?', 'Favorite color?'),
        ('Favorite number?', 'Favorite number?'),
        ('How old were you in 2010?', 'How old were you in 2010?'),
    )

    id_pregunta = models.AutoField(primary_key=True)
    pregunta1 = models.CharField(max_length=50, choices=ASK_CHOICES)
    respuesta1 = models.CharField(max_length=50)
    pregunta2 = models.CharField(max_length=50, choices=ASK_CHOICES)
    respuesta2 = models.CharField(max_length=50)
    pregunta3 = models.CharField(max_length=50, choices=ASK_CHOICES)
    respuesta3 = models.CharField(max_length=50)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'preguntasseguridad'

    def __str__(self):
        return str(self.id_pregunta)
    
    def clean(self):
        if len({self.pregunta1, self.pregunta2, self.pregunta3}) < 3:
            raise ValidationError("Las preguntas seleccionadas no pueden repetirse.")
    
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre_categoria = models.CharField(max_length=50, unique=True)
    descripcion_categoria = models.CharField(max_length=100)
    class Meta:
        db_table = 'categoria'
    def __str__(self):
        return str(self.nombre_categoria)

class Productos(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=50)
    descripcion_producto = models.CharField(max_length=255)
    precio_producto = models.DecimalField(max_digits=8, decimal_places=2)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')

    class Meta:
        db_table = 'productos'
    def __str__(self):
        return str(self.nombre_producto)

class Imagen(models.Model):
    id_imagen = models.AutoField(primary_key=True)
    nombre_imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True) 
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, db_column='id_producto')

    class Meta:
        db_table = 'imagen'
    def __str__(self):
        return str(self.id_imagen)

class Colores(models.Model):
    id_color = models.AutoField(primary_key=True)
    nombre_color = models.CharField(max_length=50)

    class Meta:
        db_table = 'colores'
    def __str__(self):
        return str(self.nombre_color)
      
class Talla(models.Model):
    id_talla = models.AutoField(primary_key=True)
    nombre_talla = models.CharField(max_length=50)
    cantidad = models.IntegerField(default=0)
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, db_column='id_producto')

    class Meta:
        db_table = 'talla'
        unique_together = ('nombre_talla', 'id_producto')
        constraints = [
            models.CheckConstraint(check=models.Q(cantidad__gte=0), name='talla_cantidad_no_negativa')
        ]
    def __str__(self):
        return f"{self.nombre_talla} - {self.id_producto.nombre_producto}"

class Colores_talla(models.Model):
    id_color_talla = models.AutoField(primary_key=True)
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')
    id_color = models.ForeignKey(Colores, on_delete=models.CASCADE, db_column='id_color')

    class Meta:
        db_table = 'colores_talla'
    def __str__(self):
        return str(self.id_color_talla)
    
class Stock(models.Model):
    id_stock = models.AutoField(primary_key=True)
    cantidad_actual = models.IntegerField(default=0)
    cantidad_eliminada = models.IntegerField(default=0)
    cantidad_agregada = models.IntegerField(default=0)
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')

    class Meta:
        db_table = 'stock'
    def __str__(self):
        return str(self.id_stock)
    
class Historial_stock(models.Model):
    id_historial_stock = models.AutoField(primary_key=True)
    cantidad = models.IntegerField()
    descripcion_historial_stock = models.CharField(max_length=100)
    fecha_historial_stock = models.DateField(default=timezone.localdate)
    hora_historial_stock = models.TimeField(default=timezone.localtime(timezone.now()).time())
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')

    class Meta:
        db_table = 'historial_stock'
    def __str__(self):
        return str(self.id_historial_stock)

#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////////////

class Solicitud(models.Model):
    STATUS_CHOICES = (
        ('IN REVIEW', 'IN REVIEW'),
        ('PENDING', 'PENDING'),
        ('CUT-OFF', 'CUT-OFF'),
        ('PACKAGING', 'PACKAGING'),
        ('SHIPPED', 'SHIPPED'),
    )

    id_solicitud = models.AutoField(primary_key=True)
    fecha_registro = models.DateField(default=timezone.localdate)
    hora_registro = models.TimeField(default=timezone.localtime(timezone.now()).time())
    fecha_entrega_estimada = models.DateField(default=timezone.localdate)
    estado_solicitud = models.CharField(max_length=20, choices=STATUS_CHOICES)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'solicitud'
        constraints = [
            models.CheckConstraint(check=models.Q(estado_solicitud__in=['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED']), name='estado_solicitud')
        ]
    def __str__(self):
        return str(self.id_solicitud)    
    
class Solicitud_producto(models.Model):
    id_solicitud_producto = models.AutoField(primary_key=True)
    cantidad_total = models.IntegerField(default=0)
    id_talla = models.ForeignKey(Talla, on_delete=models.CASCADE, db_column='id_talla')
    id_solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE, db_column='id_solicitud')

    class Meta:
        db_table = 'solicitud_producto'
        constraints = [
            models.CheckConstraint(check=models.Q(cantidad_total__gte=0),  name='solicitud_cantidad_total'),
        ]
    def __str__(self):
        return str(self.id_solicitud_producto)

class Area(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre_area = models.CharField(max_length=50)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')

    class Meta:
        db_table = 'area'
    def __str__(self):
        return str(self.nombre_area)
    
class Trabajo(models.Model):
    id_trabajo = models.AutoField(primary_key=True)
    descripcion_trabajo = models.CharField(max_length=100)
    id_area = models.ForeignKey(Area, on_delete=models.CASCADE, db_column='id_area')

    class Meta:
        db_table = 'trabajo'
    def __str__(self):
        return str(self.id_trabajo)

class Pedido(models.Model):
    STATUSP_CHOICES = (
        ('IN REVIEW', 'IN REVIEW'),
        ('PENDING', 'PENDING'),
        ('CUT-OFF', 'CUT-OFF'),
        ('PACKAGING', 'PACKAGING'),
        ('SHIPPED', 'SHIPPED'),
    )

    id_pedido = models.AutoField(primary_key=True)
    estado_pedido = models.CharField(max_length=20, choices=STATUSP_CHOICES) 
    cantidad_total = models.IntegerField(default=0)  
    id_solicitud_producto = models.ForeignKey(Solicitud_producto, on_delete=models.CASCADE, db_column='id_solicitud_producto')
    id_area = models.ForeignKey(Area, on_delete=models.CASCADE, db_column='id_area')

    class Meta:
        db_table = 'pedido'
        constraints = [
            models.CheckConstraint(check=models.Q(cantidad_total__gte=0),  name='pedido_cantidad_total'),
            models.CheckConstraint(check=models.Q(estado_pedido__in=['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED']), name='pedido_estado_solicitud')
        ]
    def __str__(self):
        return str(self.id_pedido)


class Historial_pedido(models.Model):
    STATUSHP_CHOICES = (
        ('IN REVIEW', 'IN REVIEW'),
        ('PENDING', 'PENDING'),
        ('CUT-OFF', 'CUT-OFF'),
        ('PACKAGING', 'PACKAGING'),
        ('SHIPPED', 'SHIPPED'),
    )

    id_historial_pedido = models.AutoField(primary_key=True)
    estado_seguimiento = models.CharField(max_length=20, choices=STATUSHP_CHOICES) 
    fecha = models.DateField(default=timezone.localdate)    
    hora = models.TimeField(default=timezone.localtime(timezone.now()).time())
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='id_pedido')

    class Meta:
        db_table = 'historial_pedido'
        constraints = [
            models.CheckConstraint(check=models.Q(estado_seguimiento__in=['IN REVIEW', 'PENDING', 'CUT-OFF', 'PACKAGING', 'SHIPPED']), name='historial_estado_solicitud')
        ]
    def __str__(self):
        return str(self.id_historial_pedido)
