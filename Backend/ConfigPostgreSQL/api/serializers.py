from rest_framework import serializers
from django import forms
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
    class Meta:
        model = Perfil
        fields = '__all__'

class Preguntasseguridad_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Preguntasseguridad
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        pregunta1 = cleaned_data.get('pregunta1')
        pregunta2 = cleaned_data.get('pregunta2')
        pregunta3 = cleaned_data.get('pregunta3')

        if len({pregunta1, pregunta2, pregunta3}) < 3:
            raise forms.ValidationError("Las preguntas seleccionadas no pueden repetirse.")

        return cleaned_data

#--------------------------------------------------------------------------------

class Categoria_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class Productos_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class Talla_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Talla
        fields = '__all__'

class Colores_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Colores
        fields = '__all__'

class Stock_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class Historial_stock_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Historial_stock
        fields = '__all__'

#--------------------------------------------------------------------------------

class Solicitud_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = '__all__'

class Solicitud_producto_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud_producto
        fields = '__all__'

class Area_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class Trabajo_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajo
        fields = '__all__'

class Pedido_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class Historial_pedido_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Historial_pedido
        fields = '__all__'
