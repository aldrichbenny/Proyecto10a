from rest_framework import generics
from .models import *
from .serializers import *
from django.urls import reverse, resolve
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class Roles_ListCreate(generics.ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = Roles_Serializer
class Roles_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Roles.objects.all()
    serializer_class = Roles_Serializer

#/////////////////////////////////
#           AQUI EL HASH
#/////////////////////////////////
class Usuario_ListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer
class Usuario_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = Usuario_Serializer

#/////////////////////////////////
#           AQUI EL HASH
#/////////////////////////////////


class Perfil_ListCreate(generics.ListCreateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = Perfil_Serializer
class Perfil_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Perfil.objects.all()
    serializer_class = Perfil_Serializer

class Preguntasseguridad_ListCreate(generics.ListCreateAPIView):
    queryset = Preguntasseguridad.objects.all()
    serializer_class = Preguntasseguridad_Serializer
class Preguntasseguridad_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Preguntasseguridad.objects.all()
    serializer_class = Preguntasseguridad_Serializer

#-----------------------------------------------------------------

class Categoria_ListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = Categoria_Serializer
class Categoria_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = Categoria_Serializer

class Productos_ListCreate(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = Productos_Serializer
class Productos_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = Productos_Serializer

class Talla_ListCreate(generics.ListCreateAPIView):
    queryset = Talla.objects.all()
    serializer_class = Talla_Serializer
class Talla_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Talla.objects.all()
    serializer_class = Talla_Serializer

class Colores_ListCreate(generics.ListCreateAPIView):
    queryset = Colores.objects.all()
    serializer_class = Colores_Serializer
class Colores_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Colores.objects.all()
    serializer_class = Colores_Serializer

class Stock_ListCreate(generics.ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = Stock_Serializer
class Stock_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stock.objects.all()
    serializer_class = Stock_Serializer

class Historial_stock_ListCreate(generics.ListCreateAPIView):
    queryset = Historial_stock.objects.all()
    serializer_class = Historial_stock_Serializer
class Historial_stock_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historial_stock.objects.all()
    serializer_class = Historial_stock_Serializer

#-------------------------------------------------------------------

class Solicitud_ListCreate(generics.ListCreateAPIView):
    queryset = Solicitud.objects.all()
    serializer_class = Solicitud_Serializer
class Solicitud_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Solicitud.objects.all()
    serializer_class = Solicitud_Serializer

class Solicitud_producto_ListCreate(generics.ListCreateAPIView):
    queryset = Solicitud_producto.objects.all()
    serializer_class = Solicitud_producto_Serializer
class Solicitud_producto_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Solicitud_producto.objects.all()
    serializer_class = Solicitud_producto_Serializer

class Area_ListCreate(generics.ListCreateAPIView):
    queryset = Area.objects.all()
    serializer_class = Area_Serializer
class Area_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Area.objects.all()
    serializer_class = Area_Serializer

class Trabajo_ListCreate(generics.ListCreateAPIView):
    queryset = Trabajo.objects.all()
    serializer_class = Trabajo_Serializer
class Trabajo_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historial_stock.objects.all()
    serializer_class = Trabajo_Serializer

class Pedido_ListCreate(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = Pedido_Serializer
class Pedido_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = Pedido_Serializer

class Historial_pedido_ListCreate(generics.ListCreateAPIView):
    queryset = Historial_pedido.objects.all()
    serializer_class = Historial_pedido_Serializer
class Historial_pedido_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historial_pedido.objects.all()
    serializer_class = Historial_pedido_Serializer

#-------------------------------------------------------------------

class ApiUrlsView(APIView):
    def get(self, request, *args, **kwargs):
        url_patterns = {
            "Roles": request.build_absolute_uri(reverse('Roles_list_create')),
            "Usuario": request.build_absolute_uri(reverse('Usuario_list_create')),
            "Perfil": request.build_absolute_uri(reverse('Perfillist_create')),
            "Preguntas de seguridad": request.build_absolute_uri(reverse('Preguntasseguridad_list_create')),
            "Categoría": request.build_absolute_uri(reverse('Categoria_list_create')),
            "Productos": request.build_absolute_uri(reverse('Productos_list_create')),
            "Talla": request.build_absolute_uri(reverse('Talla_list_create')),
            "Colores": request.build_absolute_uri(reverse('Colores_list_create')),
            "Stock": request.build_absolute_uri(reverse('Stock_list_create')),
            "Historial de stock": request.build_absolute_uri(reverse('Historial_stock_list_create')),
            "Solicitud": request.build_absolute_uri(reverse('Solicitud_list_create')),
            "Solicitud de producto": request.build_absolute_uri(reverse('Solicitud_producto_list_create')),
            "Área": request.build_absolute_uri(reverse('Area_list_create')),
            "Trabajo": request.build_absolute_uri(reverse('Trabajo_list_create')),
            "Pedido": request.build_absolute_uri(reverse('Pedido_list_create')),
            "Historial de pedido": request.build_absolute_uri(reverse('Historial_pedido_list_create')),
        }

        return Response(url_patterns, status=status.HTTP_200_OK)
