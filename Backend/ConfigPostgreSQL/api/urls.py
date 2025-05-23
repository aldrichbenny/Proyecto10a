from django.urls import path
from .views import *
from .views import ApiUrlsView

urlpatterns = [
    path('', ApiUrlsView.as_view(), name='api_urls'),
    path('Login/', LoginView.as_view(), name='Login'),

    # ----------------------------------------------------------------------------------------------------

    path('Roles/', Roles_ListCreate.as_view(), name='Roles_list_create'),
    path('Roles/<int:pk>/', Roles_RetrieveUpdateDestroy.as_view(), name='Roles_detail'),

    path('Usuario/', Usuario_ListCreate.as_view(), name='Usuario_list_create'),
    path('Usuario/<int:pk>/', Usuario_RetrieveUpdateDestroy.as_view(), name='Usuario_detail'),

    path('Perfil/', Perfil_ListCreate.as_view(), name='Perfillist_create'),
    path('Perfil/<int:pk>/', Perfil_RetrieveUpdateDestroy.as_view(), name='Perfil_detail'),

    path('Preguntasseguridad/', Preguntasseguridad_ListCreate.as_view(), name='Preguntasseguridad_list_create'),
    path('Preguntasseguridad/<int:pk>/', Preguntasseguridad_RetrieveUpdateDestroy.as_view(), name='Preguntasseguridad_detail'),

    # ----------------------------------------------------------------------------------------------------

    path('Categoria/', Categoria_ListCreate.as_view(), name='Categoria_list_create'),
    path('Categoria/<int:pk>/', Categoria_RetrieveUpdateDestroy.as_view(), name='Categoria_detail'),

    path('Productos/', Productos_ListCreate.as_view(), name='Productos_list_create'),
    path('Productos/<int:pk>/', Productos_RetrieveUpdateDestroy.as_view(), name='Productos_detail'),

    path('Imagen/', Imagen_ListCreate.as_view(), name='Imagen_list_create'),
    path('Imagen/<int:pk>/', Imagen_RetrieveUpdateDestroy.as_view(), name='Imagen_detail'),

    path('Talla/', Talla_ListCreate.as_view(), name='Talla_list_create'),
    path('Talla/<int:pk>/', Talla_RetrieveUpdateDestroy.as_view(), name='Talla_detail'),

    path('Colores/', Colores_ListCreate.as_view(), name='Colores_list_create'),
    path('Colores/<int:pk>/', Colores_RetrieveUpdateDestroy.as_view(), name='Colores_detail'),

    path('Colores_talla/', Colores_talla_ListCreate.as_view(), name='Colores_talla_list_create'),
    path('Colores_talla/<int:pk>/', Colores_talla_RetrieveUpdateDestroy.as_view(), name='Colores_talla_detail'),

    path('Stock/', Stock_ListCreate.as_view(), name='Stock_list_create'),
    path('Stock/<int:pk>/', Stock_RetrieveUpdateDestroy.as_view(), name='Stock_detail'),

    path('Historial_stock/', Historial_stock_ListCreate.as_view(), name='Historial_stock_list_create'),
    path('Historial_stock/<int:pk>/', Historial_stock_RetrieveUpdateDestroy.as_view(), name='Historial_stock_detail'),

    # ----------------------------------------------------------------------------------------------------

    path('Solicitud/', Solicitud_ListCreate.as_view(), name='Solicitud_list_create'),
    path('Solicitud/<int:pk>/', Solicitud_RetrieveUpdateDestroy.as_view(), name='Solicitud_detail'),

    path('Solicitud_producto/', Solicitud_producto_ListCreate.as_view(), name='Solicitud_producto_list_create'),
    path('Solicitud_producto/<int:pk>/', Solicitud_producto_RetrieveUpdateDestroy.as_view(), name='Solicitud_producto_detail'),
     path('Solicitud_producto/solicitud/<int:id_solicitud>/', Solicitud_producto_by_id.as_view(), name='solicitud-producto-por-solicitud'),

    path('Area/', Area_ListCreate.as_view(), name='Area_list_create'),
    path('Area/<int:pk>/', Area_RetrieveUpdateDestroy.as_view(), name='Area_detail'),

    path('Trabajo/', Trabajo_ListCreate.as_view(), name='Trabajo_list_create'),
    path('Trabajo/<int:pk>/', Trabajo_RetrieveUpdateDestroy.as_view(), name='Trabajo_detail'),

    path('Pedido/', Pedido_ListCreate.as_view(), name='Pedido_list_create'),
    path('Pedido/<int:pk>/', Pedido_RetrieveUpdateDestroy.as_view(), name='Pedido_detail'),
    path('Pedido/estado/<str:estado>/', Pedido_ByStatus.as_view(), name='Pedido_by_status'),
    path('Pedido/area/<str:nombre_area>/', Pedido_ByArea.as_view(), name='Pedido_by_area'),
    path('Pedido/area/<str:nombre_area>/estado/<str:estado_pedido>/', Pedido_ByAreaAndStatus.as_view(), name='Pedido_by_area_and_status'),


    path('Historial_pedido/', Historial_pedido_ListCreate.as_view(), name='Historial_pedido_list_create'),
    path('Historial_pedido/<int:pk>/', Historial_pedido_RetrieveUpdateDestroy.as_view(), name='Historial_pedido_detail'),

    path('Actualizar_contraseña/', Actualizar_contraseña.as_view(), name='Actualizar_contraseña'),

    path('Wishlist/', Wishlist_ListCreate.as_view(), name='Wishlist'),
    path('Wishlist/<int:pk>/', Wishlist_RetrieveUpdateDestroy.as_view(), name='Wishlist_detail'),

    path('Wishlist_producto/', Wishlist_producto_ListCreate.as_view(), name='Wishlist_producto'),
    path('Wishlist_producto/<int:pk>/', Wishlist_producto_RetrieveUpdateDestroy.as_view(), name='Wishlist_producto_detail'),

    path('Carrito/', Carrito_ListCreate.as_view(), name='Carrito'),
    path('Carrito/<int:pk>/', Carrito_RetrieveUpdateDestroy.as_view(), name='Carrito_detail'),

    path('Carrito_producto/', Wishlist_producto_ListCreate.as_view(), name='Carrito_producto'),
    path('Carrito_producto/<int:pk>/', Wishlist_producto_RetrieveUpdateDestroy.as_view(), name='Carrito_producto_detail'),
]