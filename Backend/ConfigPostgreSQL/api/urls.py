from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken import views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .views import *
from .views import ApiUrlsView

urlpatterns = [
    path('auth/', obtain_auth_token, name='api_token_auth'),

    # ----------------------------------------------------------------------------------------------------

    path('Roles/', Roles_ListCreate.as_view(), name='Roles_list_create'),
    path('Roles/<int:pk>/', Roles_RetrieveUpdateDestroy.as_view(), name='Roles_detail'),

    path('Usuario/', Usuario_ListCreate.as_view(), name='usuario_list_create'),
    path('Usuario/<int:pk>/', Usuario_RetrieveUpdateDestroy.as_view(), name='usuario_detail'),

    path('Perfil/', Perfil_ListCreate.as_view(), name='Perfillist_create'),
    path('Perfil/<int:pk>/', Perfil_RetrieveUpdateDestroy.as_view(), name='Perfil_detail'),

    path('Preguntasseguridad/', Preguntasseguridad_ListCreate.as_view(), name='Preguntasseguridad_list_create'),
    path('Preguntasseguridad/<int:pk>/', Preguntasseguridad_RetrieveUpdateDestroy.as_view(), name='Preguntasseguridad_detail'),

    # ----------------------------------------------------------------------------------------------------

    path('Categoria/', Categoria_ListCreate.as_view(), name='Categoria_list_create'),
    path('Categoria/<int:pk>/', Categoria_RetrieveUpdateDestroy.as_view(), name='Categoria_detail'),

    path('Productos/', Productos_ListCreate.as_view(), name='Productos_list_create'),
    path('Productos/<int:pk>/', Productos_RetrieveUpdateDestroy.as_view(), name='Productos_detail'),

    path('Talla/', Talla_ListCreate.as_view(), name='Talla_list_create'),
    path('Talla/<int:pk>/', Talla_RetrieveUpdateDestroy.as_view(), name='Talla_detail'),

    path('Colores/', Colores_ListCreate.as_view(), name='Colores_list_create'),
    path('Colores/<int:pk>/', Colores_RetrieveUpdateDestroy.as_view(), name='Colores_detail'),

    path('Stock/', Stock_ListCreate.as_view(), name='Stock_list_create'),
    path('Stock/<int:pk>/', Stock_RetrieveUpdateDestroy.as_view(), name='Stock_detail'),

    path('Historial_stock/', Historial_stock_ListCreate.as_view(), name='Historial_stock_list_create'),
    path('Historial_stock/<int:pk>/', Historial_stock_RetrieveUpdateDestroy.as_view(), name='Historial_stock_detail'),

    # ----------------------------------------------------------------------------------------------------

    path('Solicitud/', Solicitud_ListCreate.as_view(), name='Solicitud_list_create'),
    path('Solicitud/<int:pk>/', Solicitud_RetrieveUpdateDestroy.as_view(), name='Solicitud_detail'),

    path('Solicitud_producto/', Solicitud_producto_ListCreate.as_view(), name='Solicitud_producto_list_create'),
    path('Solicitud_producto/<int:pk>/', Solicitud_producto_RetrieveUpdateDestroy.as_view(), name='Solicitud_producto_detail'),

    path('Area/', Area_ListCreate.as_view(), name='Area_list_create'),
    path('Area/<int:pk>/', Area_RetrieveUpdateDestroy.as_view(), name='Area_detail'),

    path('Trabajo/', Trabajo_ListCreate.as_view(), name='Trabajo_list_create'),
    path('Trabajo/<int:pk>/', Trabajo_RetrieveUpdateDestroy.as_view(), name='Trabajo_detail'),

    path('Pedido/', Pedido_ListCreate.as_view(), name='Pedido_list_create'),
    path('Pedido/<int:pk>/', Pedido_RetrieveUpdateDestroy.as_view(), name='Pedido_detail'),

    path('Historial_pedido/', Historial_pedido_ListCreate.as_view(), name='Historial_pedido_list_create'),
    path('Historial_pedido/<int:pk>/', Historial_pedido_RetrieveUpdateDestroy.as_view(), name='Historial_pedido_detail'),

    path('', ApiUrlsView.as_view(), name='api_urls'),
]

# Decorador para agregar autenticación a las vistas
def authenticated_view(view):
    return api_view(['GET', 'POST', 'PUT', 'DELETE'])(authentication_classes([TokenAuthentication])(permission_classes([IsAuthenticated])(view)))

# Agregar autenticación a las vistas
Roles_ListCreate = authenticated_view(Roles_ListCreate)
Roles_RetrieveUpdateDestroy = authenticated_view(Roles_RetrieveUpdateDestroy)

Perfil_ListCreate = authenticated_view(Perfil_ListCreate)
Perfil_RetrieveUpdateDestroy = authenticated_view(Perfil_RetrieveUpdateDestroy)

Preguntasseguridad_ListCreate = authenticated_view(Preguntasseguridad_ListCreate)
Preguntasseguridad_RetrieveUpdateDestroy = authenticated_view(Preguntasseguridad_RetrieveUpdateDestroy)

Categoria_ListCreate = authenticated_view(Categoria_ListCreate)
Categoria_RetrieveUpdateDestroy = authenticated_view(Categoria_RetrieveUpdateDestroy)

Productos_ListCreate = authenticated_view(Productos_ListCreate)
Productos_RetrieveUpdateDestroy = authenticated_view(Productos_RetrieveUpdateDestroy)

Talla_ListCreate = authenticated_view(Talla_ListCreate)
Talla_RetrieveUpdateDestroy = authenticated_view(Talla_RetrieveUpdateDestroy)

Colores_ListCreate = authenticated_view(Colores_ListCreate)
Colores_RetrieveUpdateDestroy = authenticated_view(Colores_RetrieveUpdateDestroy)

Stock_ListCreate = authenticated_view(Stock_ListCreate)
Stock_RetrieveUpdateDestroy = authenticated_view(Stock_RetrieveUpdateDestroy)

Historial_stock_ListCreate = authenticated_view(Historial_stock_ListCreate)
Historial_stock_RetrieveUpdateDestroy = authenticated_view(Historial_stock_RetrieveUpdateDestroy)

Solicitud_ListCreate = authenticated_view(Solicitud_ListCreate)
Solicitud_RetrieveUpdateDestroy = authenticated_view(Solicitud_RetrieveUpdateDestroy)

Solicitud_producto_ListCreate = authenticated_view(Solicitud_producto_ListCreate)
Solicitud_producto_RetrieveUpdateDestroy = authenticated_view(Solicitud_producto_RetrieveUpdateDestroy)

Area_ListCreate = authenticated_view(Area_ListCreate)
Area_RetrieveUpdateDestroy = authenticated_view(Area_RetrieveUpdateDestroy)

Trabajo_ListCreate = authenticated_view(Trabajo_ListCreate)
Trabajo_RetrieveUpdateDestroy = authenticated_view(Trabajo_RetrieveUpdateDestroy)

Pedido_ListCreate = authenticated_view(Pedido_ListCreate)
Pedido_RetrieveUpdateDestroy = authenticated_view(Pedido_RetrieveUpdateDestroy)

Historial_pedido_ListCreate = authenticated_view(Historial_pedido_ListCreate)
Historial_pedido_RetrieveUpdateDestroy = authenticated_view(Historial_pedido_RetrieveUpdateDestroy)

ApiUrlsView = authenticated_view(ApiUrlsView)
