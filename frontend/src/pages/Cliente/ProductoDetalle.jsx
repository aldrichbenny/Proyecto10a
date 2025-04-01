
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton, CircularProgress, Stack, Modal, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [sizesData, setSizesData] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(1000);
  const [error, setError] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Obtener todas las imágenes
        const imagesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        
        // Filtrar las imágenes del producto actual
        const productImagesData = imagesResponse.data.filter(
          img => img.id_producto === parseInt(id)
        );
        
        // Si no hay imágenes, usar una imagen por defecto
        if (productImagesData.length === 0) {
          setProductImages(['/images/default-product.png']);
          
          // Obtener los datos del producto directamente
          const productResponse = await axios.get(`http://127.0.0.1:8000/api/Productos/${id}`);
          setProduct(productResponse.data);
        } else {
          // Extraer las URLs de las imágenes
          const imageUrls = productImagesData.map(img => img.nombre_imagen);
          setProductImages(imageUrls);
          
          // Establecer los datos del producto (tomados de la primera imagen)
          setProduct(productImagesData[0].detalle_id_producto);
        }
        
        // Fetch available sizes for this product
        const sizesResponse = await axios.get('http://127.0.0.1:8000/api/Talla');
        const productSizes = sizesResponse.data.filter(
          size => size.id_producto === parseInt(id)
        );
        
        // Set available sizes and their data
        setSizesData(productSizes);
        setAvailableSizes(productSizes.map(size => size.nombre_talla));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('No se pudo cargar la información del producto. Por favor, intente de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Si está cargando, mostrar indicador de carga
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ flexGrow: 1, py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Container>
        <Footer />
      </Box>
    );
  }

  // Si hay un error, mostrar mensaje de error
  if (error || !product) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ flexGrow: 1, py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography color="error">{error || 'Producto no encontrado'}</Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    
    // Find the selected size data to get the maximum quantity
    const selectedSizeData = sizesData.find(s => s.nombre_talla === size);
    if (selectedSizeData) {
      setMaxQuantity(selectedSizeData.cantidad);
      setSelectedSizeId(selectedSizeData.id_talla);
      // Reset quantity if it's more than the max for this size
      if (quantity > selectedSizeData.cantidad) {
        setQuantity(1);
      }
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    // Calcular el subtotal y total
    const productPrice = parseFloat(product.precio_producto);
    const calculatedSubtotal = productPrice * quantity;
    // Aplicar un descuento del 7% para el ejemplo
    const calculatedTotal = calculatedSubtotal * 0.93;
    
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedTotal);
    
    // Calcular fecha de entrega estimada (3 días después de hoy)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    setEstimatedDeliveryDate(
      `${deliveryDate.getDate().toString().padStart(2, '0')}/${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}/${deliveryDate.getFullYear()}`
    );
    
    // Abrir el modal de confirmación
    setOpenConfirmModal(true);
  };
  
  const handleConfirmOrder = async () => {
    try {
      setOrderLoading(true);
      
      // Obtener la fecha actual para el registro
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      
      // Obtener la hora actual
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
      
      // Calcular la fecha de entrega estimada (formato YYYY-MM-DD)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      const formattedDeliveryDate = `${deliveryDate.getFullYear()}-${String(deliveryDate.getMonth() + 1).padStart(2, '0')}-${String(deliveryDate.getDate()).padStart(2, '0')}`;
      
      // Crear el objeto de solicitud de producto directamente
      const solicitudProductoData = {
        cantidad_total: quantity,
        id_talla: selectedSizeId,
        detalle_id_talla: {
          id_talla: selectedSizeId,
          nombre_talla: selectedSize,
          cantidad: maxQuantity,
          id_producto: product.id_producto,
          detalle_id_producto: {
            id_producto: product.id_producto,
            nombre_producto: product.nombre_producto,
            descripcion_producto: product.descripcion_producto,
            precio_producto: product.precio_producto,
            id_categoria: product.id_categoria,
            detalle_id_categoria: {
              id_categoria: product.id_categoria,
              nombre_categoria: product.detalle_id_categoria?.nombre_categoria || "",
              descripcion_categoria: product.detalle_id_categoria?.descripcion_categoria || ""
            }
          }
        },
        id_solicitud: 1, // Valor por defecto
        detalle_id_solicitud: {
          id_solicitud: 1,
          fecha_registro: formattedDate,
          hora_registro: formattedTime,
          fecha_entrega_estimada: formattedDeliveryDate,
          estado_solicitud: "IN REVIEW",
          id_usuario: 1,
          detalle_id_usuario: {
            id_usuario: 1,
            correo: "cliente1@email.com",
            id_rol: 1,
            detalle_id_rol: {
              id_rol: 1,
              nombre_rol: "Customer",
              descripcion_rol: "User who makes purchases on the platform"
            }
          }
        }
      };
      
      // Enviar la solicitud de producto a la API
      const response = await axios.post('http://127.0.0.1:8000/api/Solicitud_producto/', solicitudProductoData);
      
      console.log('Datos enviados al servidor:', solicitudProductoData);
      console.log('Respuesta del servidor:', response.data);
      
      // Guardar la información del pedido en localStorage para mostrarla en la página de Mis Pedidos
      const pedidoInfo = {
        id_solicitud_producto: response.data?.id_solicitud_producto || Date.now(), // Usar el ID de la respuesta o generar uno temporal
        nombre_producto: product.nombre_producto,
        descripcion_producto: product.descripcion_producto,
        marca: product.marca || 'Luis Vuitron',
        cantidad_total: quantity,
        precio_unitario: product.precio_producto,
        precio_total: total,
        talla: selectedSize,
        fecha_entrega: formattedDeliveryDate,
        estado: "EN PROCESO",
        imagen: productImages[0] // Usar la primera imagen del producto
      };
      
      localStorage.setItem('ultimoPedido', JSON.stringify(pedidoInfo));
      
      setOrderLoading(false);
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      setOrderLoading(false);
      setOpenConfirmModal(false);
      
      // Mostrar un mensaje de error más detallado
      let errorMsg = 'Error al procesar el pedido. Por favor, intenta de nuevo.';
      
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado
        // que cae fuera del rango 2xx
        errorMsg = `Error ${error.response.status}: ${error.response.data.detail || 'Error del servidor'}`;
        console.log('Datos de respuesta de error:', error.response.data);
        console.log('Estado HTTP:', error.response.status);
        console.log('Cabeceras:', error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        errorMsg = 'No se recibió respuesta del servidor. Verifica tu conexión a internet.';
        console.log('Solicitud sin respuesta:', error.request);
      } else {
        // Algo ocurrió al configurar la solicitud que desencadenó un error
        errorMsg = `Error: ${error.message}`;
        console.log('Error de configuración:', error.message);
      }
      
      setErrorMessage(errorMsg);
      setOpenErrorModal(true);
    }
  };
  
  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
    // Redirigir a la página de Mis Pedidos
    navigate('/mis-pedidos');
  };
  
  const handleErrorClose = () => {
    setOpenErrorModal(false);
  };

  const handleCancelOrder = () => {
    setOpenConfirmModal(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        {/* Main Product Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {/* Thumbnail Images - Vertical Column */}
            <Grid item xs={1} md={1}>
              <Stack spacing={2} alignItems="center">
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: selectedImage === index ? '2px solid #000' : '1px solid #ddd',
                      borderRadius: 0,
                      width: '70px',
                      height: '70px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      '&:hover': { 
                        borderColor: '#666',
                      }
                    }}
                    onClick={() => handleImageSelect(index)}
                  >
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            {/* Main Product Image */}
            <Grid item xs={11} md={5}>
              <Box
                sx={{
                  width: '100%',
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  border: '1px solid #f5f5f5',
                  backgroundColor: '#fff'
                }}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.nombre_producto}
                  style={{ 
                    width: '400px',
                    height: '400px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Box>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h1" gutterBottom>
                {product.nombre_producto}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  ID: {product.id_producto}
                </Typography>
              </Box>
              
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${parseFloat(product.precio_producto).toFixed(2)} MXN
                {product.precio_anterior && (
                  <Typography variant="body2" component="span" sx={{ textDecoration: 'line-through', color: 'text.secondary', ml: 2 }}>
                    ${parseFloat(product.precio_anterior).toFixed(2)} MXN
                  </Typography>
                )}
              </Typography>
              
              <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                Envío gratis
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Selecciona la talla para conocer cuando te llega.
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Talla:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      sx={{
                        minWidth: '50px',
                        borderColor: selectedSize === size ? 'primary.main' : '#ddd',
                        color: selectedSize === size ? 'white' : 'text.primary',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: selectedSize === size ? 'primary.main' : 'transparent',
                        }
                      }}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
                  Cantidad:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                  <IconButton size="small" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Box component="span" sx={{ fontSize: '1.2rem' }}>−</Box>
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton size="small" onClick={() => handleQuantityChange(1)} disabled={quantity >= maxQuantity}>
                    <Box component="span" sx={{ fontSize: '1.2rem' }}>+</Box>
                  </IconButton>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                  Cantidad Max: {maxQuantity}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                sx={{ 
                  mb: 2, 
                  py: 1.5, 
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#388E3C',
                  }
                }}
                onClick={handleBuyNow}
              >
                Pedir Producto
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {/* Description Section */}
        <Box sx={{ mb: 4, border: '1px solid #ddd', borderRadius: 1 }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
            textAlign: 'center'
          }}>
            <Typography variant="h6" component="h2">
              DESCRIPCIÓN
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1">
              {product.descripcion_producto}
            </Typography>
          </Box>
        </Box>
      </Container>
      
      {/* Modal de Confirmación de Compra */}
      <Modal
        open={openConfirmModal}
        onClose={handleCancelOrder}
        aria-labelledby="modal-confirm-order"
        aria-describedby="modal-confirm-order-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          bgcolor: '#f9f9f9',
          boxShadow: 24,
          p: 3,
          borderRadius: 1
        }}>
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Confirmación de compra
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Resumen
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Precio por producto:</Typography>
            <Typography variant="body2">${parseFloat(product.precio_producto).toFixed(2)} MXN</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Cantidad:</Typography>
            <Typography variant="body2">{quantity}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">${subtotal.toFixed(2)} MXN</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
            <Typography variant="body1" fontWeight="bold">Total final:</Typography>
            <Typography variant="body1" fontWeight="bold">${total.toFixed(2)} MXN</Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" fontWeight="bold">
            Fecha de entrega estimada:
          </Typography>
          <Typography variant="body1" mb={3}>
            {estimatedDeliveryDate}
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              mb: 1, 
              py: 1, 
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: '#333',
              }
            }}
            onClick={handleConfirmOrder}
            disabled={orderLoading}
          >
            {orderLoading ? 'Procesando...' : 'Pagar'}
          </Button>
          
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              py: 1, 
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: '#333',
              }
            }}
            onClick={handleCancelOrder}
          >
            Cancelar pedido
          </Button>
        </Box>
      </Modal>
      
      {/* Modal de Éxito */}
      <Modal
        open={openSuccessModal}
        onClose={handleSuccessModalClose}
        aria-labelledby="modal-success-order"
        aria-describedby="modal-success-order-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          bgcolor: '#f9f9f9',
          boxShadow: 24,
          p: 3,
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Box sx={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            bgcolor: '#4CAF50',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Box component="span" sx={{ color: 'white', fontSize: '2rem' }}>✓</Box>
          </Box>
          
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Su pedido fue realizado exitosamente
          </Typography>
          
          <Typography variant="body1" sx={{ my: 2 }}>
            Gracias por su compra. Su pedido ha sido registrado y será procesado a la brevedad.
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              mt: 2,
              py: 1, 
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: '#333',
              }
            }}
            onClick={handleSuccessModalClose}
          >
            Continuar
          </Button>
        </Box>
      </Modal>
      
      {/* Modal de Error */}
      <Modal
        open={openErrorModal}
        onClose={handleErrorClose}
        aria-labelledby="modal-error-order"
        aria-describedby="modal-error-order-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          bgcolor: '#f9f9f9',
          boxShadow: 24,
          p: 3,
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Box sx={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            bgcolor: '#f44336',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Box component="span" sx={{ color: 'white', fontSize: '2rem' }}>✕</Box>
          </Box>
          
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Hubo un error al momento de realizar su pedido
          </Typography>
          
          <Typography variant="body1" sx={{ my: 2 }}>
            {errorMessage}
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            sx={{ 
              mt: 2,
              py: 1, 
              bgcolor: 'black',
              color: 'white',
              '&:hover': {
                bgcolor: '#333',
              }
            }}
            onClick={handleErrorClose}
          >
            Intentar de nuevo
          </Button>
        </Box>
      </Modal>
      
      <Footer />
    </Box>
  );
};

export default ProductoDetalle;
