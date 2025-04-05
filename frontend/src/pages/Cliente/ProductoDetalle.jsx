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
  
  // Verificar si el usuario está logueado
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    navigate('/');
    return null;
  }
  const user = JSON.parse(storedUser);

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
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistProductId, setWishlistProductId] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Get product data first
        const productResponse = await axios.get(`http://127.0.0.1:8000/api/Productos/${id}`);
        setProduct(productResponse.data);
        
        // Get all images
        const imagesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        
        // Filter images for current product
        const productImagesData = imagesResponse.data.filter(
          img => img.id_producto === parseInt(id)
        );
        
        // Set images or use default
        if (productImagesData.length === 0) {
          setProductImages(['/images/default-product.png']);
        } else {
          const imageUrls = productImagesData.map(img => img.nombre_imagen);
          setProductImages(imageUrls);
        }
        
        // Fetch available sizes for this product
        const sizesResponse = await axios.get('http://127.0.0.1:8000/api/Talla');
        const productSizes = sizesResponse.data.filter(
          size => size.id_producto === parseInt(id)
        );
        
        // Set available sizes and their data
        setSizesData(productSizes);
        setAvailableSizes(productSizes.map(size => size.nombre_talla));

        // Check if product is in wishlist
        const wishlistResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist/');
        const userWishlist = wishlistResponse.data.find(w => w.id_usuario === user.id_usuario);
        
        if (userWishlist) {
          const wishlistProductsResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist_producto/');
          const wishlistProduct = wishlistProductsResponse.data.find(
            wp => wp.id_wishlist === userWishlist.id_wishlist && parseInt(wp.id_producto) === parseInt(id)
          );
          
          if (wishlistProduct) {
            setIsInWishlist(true);
            setWishlistProductId(wishlistProduct.id_wishlist_producto);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product data:', err);
        if (err.response) {
          console.log('Error response:', err.response.data);
        }
        setError('Failed to load product information. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, user.id_usuario]);

  const handleWishlistClick = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/');
        return;
      }
      const user = JSON.parse(userStr);

      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`http://127.0.0.1:8000/api/Wishlist_producto/${wishlistProductId}/`);
        setIsInWishlist(false);
        setWishlistProductId(null);
      } else {
        // Get or create user's wishlist
        const wishlistResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist/');
        let userWishlist = wishlistResponse.data.find(w => w.id_usuario === user.id_usuario);
        
        if (!userWishlist) {
          // Create new wishlist for user
          const newWishlistResponse = await axios.post('http://127.0.0.1:8000/api/Wishlist/', {
            id_usuario: user.id_usuario
          });
          userWishlist = newWishlistResponse.data;
        }

        // Add product to wishlist
        const response = await axios.post('http://127.0.0.1:8000/api/Wishlist_producto/', {
          id_wishlist: userWishlist.id_wishlist,
          id_producto: parseInt(id)
        });

        console.log('Wishlist product created:', response.data);
        
        setIsInWishlist(true);
        setWishlistProductId(response.data.id_wishlist_producto);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      if (error.response) {
        console.log('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        
        const user = JSON.parse(userStr);
        
        // Get user's wishlist
        const wishlistResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist/');
        const userWishlist = wishlistResponse.data.find(w => w.id_usuario === user.id_usuario);
        
        if (userWishlist) {
          // Get wishlist products
          const wishlistProductsResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist_producto/');
          const wishlistProduct = wishlistProductsResponse.data.find(
            wp => wp.id_wishlist === userWishlist.id_wishlist && wp.id_producto === parseInt(id)
          );
          
          if (wishlistProduct) {
            setIsInWishlist(true);
            setWishlistProductId(wishlistProduct.id_wishlist_producto);
          }
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    };

    if (product) {
      checkWishlist();
    }
  }, [id, product]);

  const handleBackToCatalog = () => {
    navigate('/catalog');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

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
          <Typography color="error">{error || 'Product not found'}</Typography>
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
      alert('Please select a size');
      return;
    }
    
    // Calculate the subtotal and total
    const productPrice = parseFloat(product.precio_producto);
    const calculatedSubtotal = productPrice * quantity;
    const calculatedTotal = calculatedSubtotal; // Ahora el total es igual al subtotal
    
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedTotal);
    
    // Calculate the estimated delivery date (3 days after today)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    setEstimatedDeliveryDate(
      `${deliveryDate.getDate().toString().padStart(2, '0')}/${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}/${deliveryDate.getFullYear()}`
    );
    
    // Open the confirmation modal
    setOpenConfirmModal(true);
  };
  
  const handleConfirmOrder = async () => {
    try {
      setOrderLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      
      // 1. Crear Solicitud
      const currentDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(currentDate.getDate() + 5);

      const solicitudData = {
        fecha_registro: currentDate.toISOString().split('T')[0],
        hora_registro: currentDate.toTimeString().split(' ')[0],
        fecha_entrega_estimada: deliveryDate.toISOString().split('T')[0],
        estado_solicitud: "IN REVIEW",
        id_usuario: user.id_usuario,
        detalle_id_usuario: {
          id_usuario: user.id_usuario,
          correo: user.correo,
          id_rol: user.id_rol,
          detalle_id_rol: user.detalle_id_rol
        }
      };

      const solicitudResponse = await axios.post('http://127.0.0.1:8000/api/Solicitud/', solicitudData);

      // 2. Crear Solicitud_producto
      const solicitudProductoData = {
        cantidad_total: quantity,
        id_talla: selectedSizeId,
        id_solicitud: solicitudResponse.data.id_solicitud
      };

      const solicitudProductoResponse = await axios.post('http://127.0.0.1:8000/api/Solicitud_producto/', solicitudProductoData);

      // 3. Crear Pedido
      const pedidoData = {
        estado_pedido: "PENDING",
        cantidad_total: quantity,
        id_solicitud_producto: solicitudProductoResponse.data.id_solicitud_producto,
        id_area: 1 // Área inicial (Cut)
      };

      await axios.post('http://127.0.0.1:8000/api/Pedido/', pedidoData);

      setOrderLoading(false);
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);

    } catch (error) {
      console.error('Error creating order:', error);
      setOrderLoading(false);
      setOpenConfirmModal(false);
      setErrorMessage('Error al crear el pedido. Por favor, inténtelo de nuevo.');
      setOpenErrorModal(true);
    }
  };
  
  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
    // Redirect to the My Orders page
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
                  backgroundColor: '#fff',
                  position: 'relative'
                }}
              >
                <img
                  src={productImages[selectedImage]}
                  alt="Product"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
                <IconButton
                  onClick={handleWishlistClick}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'white',
                    '&:hover': { backgroundColor: 'white' },
                    zIndex: 1
                  }}
                >
                  <FavoriteIcon sx={{ 
                    color: isInWishlist ? 'black' : '#bdbdbd',
                    transition: 'color 0.3s ease'
                  }} />
                </IconButton>
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
                Free shipping
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Select a size to know when it arrives.
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Size:
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
                  Quantity:
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
                  Max quantity: {maxQuantity}
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
                Order Product
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
              DESCRIPTION
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
            Order Confirmation
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Summary
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Price per item:</Typography>
            <Typography variant="body2">${parseFloat(product.precio_producto).toFixed(2)} MXN</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Quantity:</Typography>
            <Typography variant="body2">{quantity}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">${subtotal.toFixed(2)} MXN</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
            <Typography variant="body1" fontWeight="bold">Total:</Typography>
            <Typography variant="body1" fontWeight="bold">${total.toFixed(2)} MXN</Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" fontWeight="bold">
            Estimated delivery date:
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
            {orderLoading ? 'Processing...' : 'Pay'}
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
            Cancel Order
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
            Your order was placed successfully
          </Typography>
          
          <Typography variant="body1" sx={{ my: 2 }}>
            Thank you for your purchase! Your order has been registered and will be processed as soon as possible.
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
            Continue
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
            There was an error with your order
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
            Try Again
          </Button>
        </Box>
      </Modal>
      
      <Footer />
    </Box>
  );
};

export default ProductoDetalle;