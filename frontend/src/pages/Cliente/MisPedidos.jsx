import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Divider, Paper, Grid, CircularProgress } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState({});
  const navigate = useNavigate();

<<<<<<< Updated upstream
=======
  // Obtener el usuario del localStorage
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    navigate('/'); // Redirigir al login si no hay usuario
    return null;
  }
  const user = JSON.parse(storedUser);
  const idUsuario = user.id_usuario;

>>>>>>> Stashed changes
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        
        // Obtener todas las solicitudes de productos
        const response = await axios.get('http://127.0.0.1:8000/api/Solicitud_producto/');
        
        // Obtener todas las imágenes de productos
        const imagenesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        
        // Crear un mapa de id_producto -> primera imagen
        const imagenesMap = {};
        imagenesResponse.data.forEach(img => {
          if (!imagenesMap[img.id_producto]) {
            imagenesMap[img.id_producto] = img.nombre_imagen;
          }
        });
        
        setImagenes(imagenesMap);
        
<<<<<<< Updated upstream
        // Filtrar las solicitudes que pertenecen al usuario con ID 1
        const pedidosUsuario = response.data.filter(
          solicitud => solicitud.detalle_id_solicitud?.id_usuario === 1
=======
        // Filtrar pedidos del usuario actual
        const pedidosUsuario = response.data.filter(
          solicitud => solicitud.detalle_id_solicitud?.id_usuario === idUsuario
>>>>>>> Stashed changes
        );
        
        console.log('ID de usuario actual:', idUsuario);
        console.log('Pedidos del usuario:', pedidosUsuario);
        
        // Formatear los datos para mostrarlos en la interfaz
        const pedidosFormateados = pedidosUsuario.map(solicitud => {
          const producto = solicitud.detalle_id_talla?.detalle_id_producto || {};
          const talla = solicitud.detalle_id_talla || {};
          const idProducto = producto.id_producto;
          
          return {
            id_solicitud_producto: solicitud.id_solicitud_producto,
            nombre_producto: producto.nombre_producto || 'Product without name',
            descripcion_producto: producto.descripcion_producto || 'No description',
            marca: producto.marca || 'Luis Vuitron',
            cantidad_total: solicitud.cantidad_total || 0,
            precio_unitario: parseFloat(producto.precio_producto) || 0,
            precio_total: (parseFloat(producto.precio_producto) * solicitud.cantidad_total) || 0,
            talla: talla.nombre_talla || 'N/A',
            fecha_entrega: solicitud.detalle_id_solicitud?.fecha_entrega_estimada || 'Not available',
            estado: solicitud.detalle_id_solicitud?.estado_solicitud || 'IN PROCESS',
            imagen: imagenesMap[idProducto] || `/images/producto${idProducto}.jpg`,
            id_producto: idProducto
          };
        });
        
        setPedidos(pedidosFormateados);
        
        // Recuperar el último pedido del localStorage si existe y no está duplicado
        const ultimoPedido = JSON.parse(localStorage.getItem('ultimoPedido'));
        if (ultimoPedido && !pedidosFormateados.some(p => p.id_solicitud_producto === ultimoPedido.id_solicitud_producto)) {
          if (ultimoPedido.id_producto && imagenesMap[ultimoPedido.id_producto]) {
            ultimoPedido.imagen = imagenesMap[ultimoPedido.id_producto];
          }
          setPedidos(prev => [...prev, ultimoPedido]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
        
        // Si hay error, intentar mostrar el último pedido del localStorage
        const ultimoPedido = JSON.parse(localStorage.getItem('ultimoPedido'));
        if (ultimoPedido) {
          setPedidos([ultimoPedido]);
        }
        
        setLoading(false);
      }
    };
    
    fetchPedidos();
  }, [idUsuario, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading orders...</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ 
          fontWeight: 'bold',
          borderBottom: '2px solid #c13a3a',
          paddingBottom: 2,
          marginBottom: 4
        }}>
          MY ORDERS
        </Typography>
        
        {pedidos.length === 0 ? (
          <Typography variant="h6" align="center">
            You haven't placed any orders yet
          </Typography>
        ) : (
          pedidos.map((pedido, index) => (
            <Paper 
              key={pedido.id_solicitud_producto || index} 
              elevation={1} 
              sx={{ 
                mb: 3, 
                p: 2,
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 3
                }
              }}
              onClick={() => navigate(`/detalle-pedido/${pedido.id_solicitud_producto}`)}
            >
              <Grid container spacing={2}>
                <Grid item xs={3} sm={2}>
                  <Box 
                    component="img"
                    src={pedido.imagen || '/images/default-product.png'}
                    alt={pedido.nombre_producto}
                    sx={{ 
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      border: '1px solid #eee',
                      borderRadius: '4px'
                    }}
                  />
                </Grid>
                
                <Grid item xs={9} sm={10}>
                  <Typography variant="h6" component="h2">
                    {pedido.nombre_producto}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      ID: {pedido.id_solicitud_producto}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      BRAND: {pedido.marca}
                    </Typography>

                    <Typography variant="body2" sx={{ mr: 2 }}>
                      SIZE: {pedido.talla}
                    </Typography>

                    <Typography variant="body2">
                      STATUS: {pedido.estado}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {pedido.descripcion_producto}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mt: 2
                  }}>
                    <Typography variant="body2">
                      Quantity: {pedido.cantidad_total}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Total Price: ${pedido.precio_total.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default MisPedidos;
