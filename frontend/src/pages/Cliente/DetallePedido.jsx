import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, Grid, CircularProgress, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useCurrency } from '../../context/CurrencyContext';

const DetallePedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [pedido, setPedido] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchPedidoDetalle = async () => {
      try {
        setLoading(true);
        
        // Obtener la solicitud específica por ID
        const response = await axios.get(`http://127.0.0.1:8000/api/Solicitud_producto/${id}/`);
        const solicitud = response.data;

        // Obtener detalles de la solicitud principal
        const solicitudMainResponse = await axios.get(`http://127.0.0.1:8000/api/Solicitud/${solicitud.id_solicitud}/`);
        const solicitudMain = solicitudMainResponse.data;

        // Obtener detalles del pedido
        const pedidoResponse = await axios.get(`http://127.0.0.1:8000/api/Pedido/`);
        const pedidoInfo = pedidoResponse.data.find(p => p.id_solicitud_producto === parseInt(id));
        
        // Obtener imágenes del producto
        const imagenesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        const idProducto = solicitud.detalle_id_talla?.detalle_id_producto?.id_producto;
        
        // Filtrar todas las imágenes del producto
        const imagenesProducto = imagenesResponse.data
          .filter(img => img.id_producto === idProducto)
          .map(img => img.nombre_imagen);

        // Si no hay imágenes, usar una por defecto
        if (imagenesProducto.length === 0) {
          imagenesProducto.push(`/images/producto${idProducto}.jpg`);
        }
        
        setImagenes(imagenesProducto);
        
        // Formatear los datos para mostrarlos en la interfaz
        const producto = solicitud.detalle_id_talla?.detalle_id_producto || {};
        const talla = solicitud.detalle_id_talla || {};
        
        // Formatear datos del pedido
        const pedidoFormateado = {
          id_solicitud_producto: solicitud.id_solicitud_producto,
          nombre_producto: producto.nombre_producto || 'Producto sin nombre',
          descripcion_producto: producto.descripcion_producto || 'Sin descripción',
          marca: 'Luis Vuitron',
          cantidad_total: solicitud.cantidad_total || 0,
          precio_unitario: parseFloat(producto.precio_producto) || 0,
          precio_total: (parseFloat(producto.precio_producto) * solicitud.cantidad_total) || 0,
          talla: talla.nombre_talla || 'N/A',
          fecha_registro: solicitudMain.fecha_registro || 'No disponible',
          fecha_entrega: solicitudMain.fecha_entrega_estimada || 'No disponible',
          estado_solicitud: solicitudMain.estado_solicitud || 'IN REVIEW',
          estado_pedido: pedidoInfo?.estado_pedido || 'PENDING',
          area_actual: pedidoInfo?.detalle_id_area?.nombre_area || 'Revision de pedido',
          id_formato: solicitudMain.id_formato || 'No disponible'
        };
        
        setPedido(pedidoFormateado);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };
    
    fetchPedidoDetalle();
  }, [id]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
            {/* Información del pedido */}
            <Paper 
              elevation={1} 
              sx={{ 
                p: 4,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                background: '#fff'
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                  <Box sx={{ 
                    width: '100%',
                    maxWidth: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Box 
                      component="img"
                      src={imagenes[activeStep]}
                      alt={pedido.nombre_producto}
                      sx={{ 
                        width: '100%',
                        height: '700px',
                        objectFit: 'contain',
                        mb: 2
                      }}
                    />
                    {imagenes.length > 1 && (
                      <Box sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center',
                        mt: 2
                      }}>
                        <MobileStepper
                          steps={imagenes.length}
                          position="static"
                          activeStep={activeStep}
                          sx={{ 
                            maxWidth: '90%',
                            width: '100%',
                            bgcolor: 'background.paper',
                            '& .MuiMobileStepper-dots': {
                              flex: 1,
                              justifyContent: 'center',
                              gap: '8px'
                            },
                            '& .MuiMobileStepper-dot': {
                              width: '10px',
                              height: '10px'
                            }
                          }}
                          nextButton={
                            <Button
                              size="small"
                              onClick={handleNext}
                              disabled={activeStep === imagenes.length - 1}
                            >
                              Siguiente
                              <KeyboardArrowRight />
                            </Button>
                          }
                          backButton={
                            <Button
                              size="small"
                              onClick={handleBack}
                              disabled={activeStep === 0}
                            >
                              <KeyboardArrowLeft />
                              Anterior
                            </Button>
                          }
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    {pedido.nombre_producto}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Marca:</strong> {pedido.marca}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Talla:</strong> {pedido.talla}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Cantidad:</strong> {pedido.cantidad_total}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Precio unitario:</strong> {formatPrice(pedido.precio_unitario)}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Fecha de entrega estimada:</strong> {pedido.fecha_entrega}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Estado de la solicitud:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '200px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: '#ffa726'
                        }}
                      />
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {pedido.estado_solicitud}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Estado del pedido:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '200px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: '#757575'
                        }}
                      />
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {pedido.estado_pedido}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Total: {formatPrice(pedido.precio_total)}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body1">
                      <strong>Descripción:</strong> {pedido.descripcion_producto}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default DetallePedido;