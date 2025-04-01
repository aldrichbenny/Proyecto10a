import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, Grid, CircularProgress, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

// Iconos para el estado del pedido
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const DetallePedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    const fetchPedidoDetalle = async () => {
      try {
        setLoading(true);
        
        // Obtener la solicitud específica por ID
        const response = await axios.get(`http://127.0.0.1:8000/api/Solicitud_producto/${id}/`);
        const solicitud = response.data;
        
        // Obtener imágenes del producto
        const imagenesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        const idProducto = solicitud.detalle_id_talla?.detalle_id_producto?.id_producto;
        
        // Buscar la primera imagen del producto
        const imagenProducto = imagenesResponse.data.find(img => img.id_producto === idProducto);
        
        // Formatear los datos para mostrarlos en la interfaz
        const producto = solicitud.detalle_id_talla?.detalle_id_producto || {};
        const talla = solicitud.detalle_id_talla || {};
        
        // Establecer la imagen del producto
        if (imagenProducto) {
          setImagen(imagenProducto.nombre_imagen);
        } else {
          setImagen(`/images/producto${idProducto}.jpg`);
        }
        
        // Formatear datos del pedido
        const pedidoFormateado = {
          id_solicitud_producto: solicitud.id_solicitud_producto,
          nombre_producto: producto.nombre_producto || 'Producto sin nombre',
          descripcion_producto: producto.descripcion_producto || 'Sin descripción',
          marca: 'Luis Vuitron', // Valor por defecto
          cantidad_total: solicitud.cantidad_total || 0,
          precio_unitario: parseFloat(producto.precio_producto) || 0,
          precio_total: (parseFloat(producto.precio_producto) * solicitud.cantidad_total) || 0,
          talla: talla.nombre_talla || 'N/A',
          fecha_registro: solicitud.detalle_id_solicitud?.fecha_registro || '18/03/2025',
          fecha_entrega: solicitud.detalle_id_solicitud?.fecha_entrega_estimada || '29/03/2025',
          estado: solicitud.detalle_id_solicitud?.estado_solicitud || 'EN PROCESO',
          area_actual: 'Revision de pedido', // Por defecto, se podría obtener de la API si estuviera disponible
          id_formato: 'K57D5E87SD4D' // ID formateado para mostrar
        };
        
        setPedido(pedidoFormateado);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        
        // Intentar recuperar los datos del localStorage como fallback
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
        const pedidoEncontrado = pedidosGuardados.find(p => p.id_solicitud_producto.toString() === id);
        
        if (pedidoEncontrado) {
          setPedido(pedidoEncontrado);
          setImagen(pedidoEncontrado.imagen || '/images/default-product.png');
        } else {
          // Si no se encuentra en localStorage, crear un pedido de muestra
          setPedido({
            id_solicitud_producto: id,
            nombre_producto: 'Producto de ejemplo',
            descripcion_producto: 'Descripción de ejemplo',
            marca: 'Luis Vuitron',
            cantidad_total: 1,
            precio_unitario: 1500,
            precio_total: 1500,
            talla: 'M',
            fecha_registro: '18/03/2025',
            fecha_entrega: '29/03/2025',
            estado: 'EN PROCESO',
            area_actual: 'Revision de pedido',
            id_formato: 'K57D5E87SD4D'
          });
          setImagen('/images/default-product.png');
        }
        
        setLoading(false);
      }
    };
    
    fetchPedidoDetalle();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Cargando detalles del pedido...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/mis-pedidos')}
          sx={{ mb: 3 }}
        >
          ← Volver a Mis Pedidos
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          borderBottom: '2px solid #c13a3a',
          paddingBottom: 2,
          marginBottom: 4
        }}>
          Detalle de Pedido
        </Typography>

        {pedido && (
          <>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3,
                borderRadius: '16px',
                mb: 4,
                background: '#fff'
              }}
            >
              {/* Área actual */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4
              }}>
                <Typography 
                  variant="body2" 
                  sx={{
                    border: '1px solid #4caf50',
                    borderRadius: '20px',
                    px: 3,
                    py: 0.5,
                    color: '#4caf50'
                  }}
                >
                  Área actual: {pedido.area_actual}
                </Typography>
              </Box>

              {/* Contenedor principal */}
              <Box sx={{ position: 'relative', pt: 4, px: 2, mt: -1 }}>
                {/* Línea gris base */}
                <Box sx={{
                  position: 'absolute',
                  top: '25px',
                  left: '40px',
                  right: '40px',
                  height: '2px',
                  backgroundColor: '#e0e0e0'
                }} />

                {/* Línea verde de progreso */}
                <Box sx={{
                  position: 'absolute',
                  top: '25px',
                  left: '40px',
                  width: '20%',
                  height: '2px',
                  backgroundColor: '#4caf50'
                }} />

                {/* Iconos y textos */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'relative',
                  px: 4
                }}>
                  {/* Revision de pedido */}
                  <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#4caf50',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      mx: 'auto'
                    }}>
                      <SearchIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: '#4caf50',
                        fontWeight: 500
                      }}
                    >
                      Revision de pedido
                    </Typography>
                  </Box>

                  {/* Pedido aceptado */}
                  <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      mx: 'auto'
                    }}>
                      <CheckCircleIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                    <Typography variant="caption" display="block">
                      Pedido aceptado
                    </Typography>
                  </Box>

                  {/* Corte */}
                  <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      mx: 'auto'
                    }}>
                      <ContentCutIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                    <Typography variant="caption" display="block">
                      Corte
                    </Typography>
                  </Box>

                  {/* Embalaje */}
                  <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      mx: 'auto'
                    }}>
                      <Inventory2Icon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                    <Typography variant="caption" display="block">
                      Embalaje
                    </Typography>
                  </Box>

                  {/* Envío */}
                  <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      mx: 'auto'
                    }}>
                      <LocalShippingIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                    <Typography variant="caption" display="block">
                      Envío
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Información del pedido */}
            <Paper 
              elevation={1} 
              sx={{ 
                mb: 4, 
                p: 3,
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box 
                    component="img"
                    src={imagen || '/images/default-product.png'}
                    alt={pedido.nombre_producto}
                    sx={{ 
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      mb: 2
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {pedido.nombre_producto}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Marca:</strong> {pedido.marca}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Talla:</strong> {pedido.talla}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Cantidad:</strong> {pedido.cantidad_total}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Precio unitario:</strong> ${pedido.precio_unitario.toLocaleString('es-MX')} MXN
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                    <strong>Total:</strong> ${pedido.precio_total.toLocaleString('es-MX')} MXN
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ mt: 3 }}>
                <strong>Descripción:</strong> {pedido.descripcion_producto}
              </Typography>
            </Paper>
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default DetallePedido;