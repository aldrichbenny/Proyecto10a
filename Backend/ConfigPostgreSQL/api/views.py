from rest_framework import generics
from .models import *
from .serializers import *
from django.urls import reverse, resolve
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer
from django.contrib.auth.hashers import make_password, check_password
import logging
from rest_framework.exceptions import ValidationError


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
    serializer_class = UsuarioSerializer
class Usuario_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

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

class Imagen_ListCreate(generics.ListCreateAPIView):
    queryset = Imagen.objects.all()
    serializer_class = Imagen_Serializer
    parser_classes = (MultiPartParser, FormParser)  # Permite recibir imágenes

class Imagen_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Imagen.objects.all()
    serializer_class = Imagen_Serializer

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

class Colores_talla_ListCreate(generics.ListCreateAPIView):
    queryset = Colores_talla.objects.all()
    serializer_class = Colores_talla_Serializer
class Colores_talla_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Colores_talla.objects.all()
    serializer_class = Colores_talla_Serializer

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

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response({"error": "Validation failed", "details": e.detail}, status=400)

class Pedido_ByStatus(generics.ListAPIView):
    serializer_class = Pedido_Serializer
    def get_queryset(self):
        estado = self.kwargs.get('estado')
        if estado:
            return Pedido.objects.filter(estado_pedido=estado)
        return Pedido.objects.none()
    
class Pedido_ByArea(generics.ListAPIView):
    serializer_class = Pedido_Serializer
    def get_queryset(self):
        nombre_area = self.kwargs.get('nombre_area')
        queryset = Pedido.objects.all()
        if nombre_area:
            queryset = queryset.filter(id_area__nombre_area=nombre_area)
        return queryset

class Pedido_ByAreaAndStatus(generics.ListAPIView):
    serializer_class = Pedido_Serializer
    def get_queryset(self):
        nombre_area = self.kwargs.get('nombre_area')
        estado_pedido = self.kwargs.get('estado_pedido') 
        queryset = Pedido.objects.all()
        if nombre_area:
            queryset = queryset.filter(id_area__nombre_area=nombre_area)
        if estado_pedido:
            queryset = queryset.filter(estado_pedido=estado_pedido)
        return queryset

class Historial_pedido_ListCreate(generics.ListCreateAPIView):
    queryset = Historial_pedido.objects.all()
    serializer_class = Historial_pedido_Serializer
class Historial_pedido_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historial_pedido.objects.all()
    serializer_class = Historial_pedido_Serializer

class Wishlist_ListCreate(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = Wishlist_Serializer
class Wishlist_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = Wishlist_Serializer

class Carrito_ListCreate(generics.ListCreateAPIView):
    queryset = Carrito.objects.all()
    serializer_class = Carrito_Serializer
class Carrito_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carrito.objects.all()
    serializer_class = Carrito_Serializer

class Wishlist_producto_ListCreate(generics.ListCreateAPIView):
    queryset = Wishlist_Producto.objects.all()
    serializer_class = Wishlist_Producto_Serializer
class Wishlist_producto_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist_Producto.objects.all()
    serializer_class = Wishlist_Producto_Serializer

class Carrito_producto_ListCreate(generics.ListCreateAPIView):
    queryset = Carrito_Producto.objects.all()
    serializer_class = Carrito_Producto_Serializer
class Carrito_producto_RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carrito_Producto.objects.all()
    serializer_class = Carrito_Producto_Serializer

#-------------------------------------------------------------------
logger = logging.getLogger(__name__)
class LoginView(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        contraseña = request.data.get('contraseña')
        logger.info(f"Intento de login con correo: {correo}")
        
        try:
            usuario = Usuario.objects.get(correo=correo)
            logger.info(f"Usuario encontrado: {usuario.correo}")
            
            if usuario.check_password(contraseña):
                logger.info("Contraseña correcta")
                serializer = UsuarioSerializer(usuario)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                logger.warning("Contraseña incorrecta")
                return Response({
                    'error': 'Credenciales inválidas',
                    'datos_enviados': {'correo': correo, 'contraseña': contraseña}
                }, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            logger.warning(f"Usuario no encontrado: {correo}")
            return Response({
                'error': 'Usuario no encontrado',
                'datos_enviados': {'correo': correo, 'contraseña': contraseña}
            }, status=status.HTTP_404_NOT_FOUND)

class Actualizar_contraseña(APIView):
    def post(self, request):
        correo = request.data.get('correo')
        contraseña_actual = request.data.get('contraseña_actual')
        nueva_contraseña = request.data.get('nueva_contraseña')

        try:
            usuario = Usuario.objects.get(correo=correo)
            if usuario.check_password(contraseña_actual):
                usuario.set_password(nueva_contraseña)
                usuario.save()
                return Response({'message': 'Contraseña actualizada correctamente'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Contraseña actual incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class ApiUrlsView(APIView):
    def get(self, request, *args, **kwargs):
        url_patterns = {
            "Roles": request.build_absolute_uri(reverse('Roles_list_create')),
            "Usuario": request.build_absolute_uri(reverse('Usuario_list_create')),
            "Perfil": request.build_absolute_uri(reverse('Perfillist_create')),
            "Preguntas de seguridad": request.build_absolute_uri(reverse('Preguntasseguridad_list_create')),
            "Categoría": request.build_absolute_uri(reverse('Categoria_list_create')),
            "Productos": request.build_absolute_uri(reverse('Productos_list_create')),
            "Imagen": request.build_absolute_uri(reverse('Imagen_list_create')),
            "Talla": request.build_absolute_uri(reverse('Talla_list_create')),
            "Colores": request.build_absolute_uri(reverse('Colores_list_create')),
            "Colores_Talla": request.build_absolute_uri(reverse('Colores_talla_list_create')),
            "Stock": request.build_absolute_uri(reverse('Stock_list_create')),
            "Historial de stock": request.build_absolute_uri(reverse('Historial_stock_list_create')),
            "Solicitud": request.build_absolute_uri(reverse('Solicitud_list_create')),
            "Solicitud de producto": request.build_absolute_uri(reverse('Solicitud_producto_list_create')),
            "Área": request.build_absolute_uri(reverse('Area_list_create')),
            "Trabajo": request.build_absolute_uri(reverse('Trabajo_list_create')),
            "Pedido": request.build_absolute_uri(reverse('Pedido_list_create')),
            "Historial de pedido": request.build_absolute_uri(reverse('Historial_pedido_list_create')),
            "Login": request.build_absolute_uri(reverse('Login')),
            "Actualizar contraseña": request.build_absolute_uri(reverse('Actualizar_contraseña')),
            "Wishlist": request.build_absolute_uri(reverse('Wishlist')),
            "Carrito": request.build_absolute_uri(reverse('Carrito')),
            "Wishlist_producto": request.build_absolute_uri(reverse('Wishlist_producto')),
            "Carrito_producto": request.build_absolute_uri(reverse('Carrito_producto')),
        }

        return Response(url_patterns, status=status.HTTP_200_OK)
