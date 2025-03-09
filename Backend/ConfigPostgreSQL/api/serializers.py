from rest_framework import serializers
from rest_framework import generics

from .models import *


class Roles_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class Usuario_Serializer(serializers.ModelSerializer):
    detalle_id_rol = Roles_Serializer(source='id_rol', read_only=True)    
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'correo', 'contraseña', 'id_rol', 'detalle_id_rol']
           
class Perfil_Serializer(serializers.ModelSerializer):
    detalle_id_usuario = Usuario_Serializer(source='id_usuario', read_only=True)    
    class Meta:
        model = Perfil
        fields = ['id_perfil','nombre','apellido_pat','apellido_mat','telefono','direccion','id_usuario','detalle_id_usuario']

class Preguntasseguridad_Serializer(serializers.ModelSerializer):
    detalle_id_usuario = Usuario_Serializer(source='id_usuario', read_only=True)    
    class Meta:
        model = Preguntasseguridad
        fields = ['id_pregunta','pregunta1', 'respuesta1','pregunta2','respuesta2','pregunta3','respuesta3','id_usuario','detalle_id_usuario']

    def validate(self, data):
            pregunta1 = data.get('pregunta1')
            pregunta2 = data.get('pregunta2')
            pregunta3 = data.get('pregunta3')

            if len({pregunta1, pregunta2, pregunta3}) < 3:
                raise serializers.ValidationError("Las preguntas seleccionadas no pueden repetirse.")
            return data

#--------------------------------------------------------------------------------

class Categoria_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class Productos_Serializer(serializers.ModelSerializer):
    detalle_id_categoria = Categoria_Serializer(source='id_categoria', read_only=True)    
    class Meta:
        model = Productos
        fields = ['id_producto','nombre_producto', 'descripcion_producto', 'precio_producto','imagen','id_categoria','detalle_id_categoria']

class Colores_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Colores
        fields = '__all__'

class Talla_Serializer(serializers.ModelSerializer):
    detalle_id_producto = Productos_Serializer(source='id_producto', read_only=True)   
    detalle_id_color = Colores_Serializer(source='id_color', read_only=True)     
    class Meta:
        model = Talla
        fields = ['id_talla','nombre_talla','cantidad','id_producto','detalle_id_producto','id_color','detalle_id_color']

class Stock_Serializer(serializers.ModelSerializer):
    detalle_id_talla = Talla_Serializer(source='id_talla', read_only=True)   
    class Meta:
        model = Stock
        fields = ['id_stock','cantidad_actual','cantidad_eliminada','cantidad_agregada','id_talla','detalle_id_talla']

class Historial_stock_Serializer(serializers.ModelSerializer):
    detalle_id_talla = Talla_Serializer(source='id_talla', read_only=True)   
    class Meta:
        model = Historial_stock
        fields = ['id_historial_stock','cantidad','descripcion_historial_stock','fecha_historial_stock','hora_historial_stock','id_talla','detalle_id_talla']

#--------------------------------------------------------------------------------

class Solicitud_Serializer(serializers.ModelSerializer):
    detalle_id_usuario = Usuario_Serializer(source='id_usuario', read_only=True)    
    class Meta:
        model = Solicitud
        fields = ['id_solicitud','fecha_registro','hora_registro','fecha_entrega_estimada','estado_solicitud','id_usuario','detalle_id_usuario']

class Solicitud_producto_Serializer(serializers.ModelSerializer):
    detalle_id_producto = Productos_Serializer(source='id_producto', read_only=True)   
    detalle_id_solicitud = Solicitud_Serializer(source='id_solicitud', read_only=True)   
    class Meta:
        model = Solicitud_producto
        fields = ['id_solicitud_producto','cantidad_total','id_producto','detalle_id_producto','id_solicitud','detalle_id_solicitud']

class Area_Serializer(serializers.ModelSerializer):
    detalle_id_usuario = Usuario_Serializer(source='id_usuario', read_only=True)    
    class Meta:
        model = Area
        fields = ['id_area','nombre_area','id_usuario','detalle_id_usuario']


class Trabajo_Serializer(serializers.ModelSerializer):
    detalle_id_area = Area_Serializer(source='id_area', read_only=True)    
    class Meta:
        model = Trabajo
        fields = ['id_trabajo','descripcion_trabajo','id_area','detalle_id_area']

class Pedido_Serializer(serializers.ModelSerializer):
    detalle_id_area = Area_Serializer(source='id_area', read_only=True)    
    detalle_id_solicitud = Solicitud_Serializer(source='id_solicitud', read_only=True)   
    class Meta:
        model = Pedido
        fields = ['id_pedido','estado_pedido','cantidad_total','id_solicitud','detalle_id_solicitud','id_area','detalle_id_area']

class Historial_pedido_Serializer(serializers.ModelSerializer):
    detalle_id_pedido = Pedido_Serializer(source='id_pedido', read_only=True)    

    class Meta:
        model = Historial_pedido
        fields = ['id_historial_pedido','estado_seguimiento','fecha','hora','id_pedido','detalle_id_pedido']
