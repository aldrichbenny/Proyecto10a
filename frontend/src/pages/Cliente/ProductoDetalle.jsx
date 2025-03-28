import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Product database
const productsData = [
  {
    id: "1",
    name: 'Camisa Luis Vuitton',
    description: 'Estampado en camisa lisa, diseño exclusivo de Luis Vuitton. Material de alta calidad y durabilidad. Perfecta para ocasiones especiales o uso diario.',
    price: '$1,862 MXN',
    originalPrice: '$2,000 MXN',
    discount: '6.9%',
    images: [
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://prezenza.com/wp-content/uploads/2024/06/playera-tipo-polo-manga-corta-negra.png',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064'
    ],
    sizes: ['XL', 'L', 'M', 'CH']
  },
  {
    id: "2",
    name: 'Camisa Luis Vuitton',
    description: 'Modelo clásico de Luis Vuitton con un toque moderno. Confeccionada con los mejores materiales para garantizar comodidad y estilo.',
    price: '$1,862 MXN',
    originalPrice: '$2,000 MXN',
    discount: '6.9%',
    images: [
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://prezenza.com/wp-content/uploads/2024/06/playera-tipo-polo-manga-corta-negra.png',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064'
    ],
    sizes: ['XL', 'L', 'M', 'CH']
  },
  {
    id: "3",
    name: 'Playera negra',
    description: 'Playera negra de corte moderno. Ideal para cualquier ocasión, combina estilo y comodidad en una prenda versátil.',
    price: '$1,862 MXN',
    originalPrice: '$2,000 MXN',
    discount: '6.9%',
    images: [
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://prezenza.com/wp-content/uploads/2024/06/playera-tipo-polo-manga-corta-negra.png',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064',
      'https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064'
    ],
    sizes: ['XL', 'L', 'M', 'CH']
  }
];

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product with the matching ID
  const product = productsData.find(p => p.id === id);

  // If product not found, redirect to catalog
  if (!product) {
    navigate('/Catalogo');
    return null;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    addToCart(product, quantity, selectedSize);
    navigate('/carrito');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    addToCart(product, quantity, selectedSize);
    navigate('/carrito');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={4}>
          {/* Left side - Product Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain'
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
            {/* Thumbnail images */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {product.images.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid black' : '2px solid transparent',
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                    onClick={() => handleImageSelect(index)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right side - Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              ID: {product.id}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
              <Typography variant="h4" component="span" fontWeight="bold">
                {product.price}
              </Typography>
              <Typography variant="body1" component="span" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                {product.originalPrice}
              </Typography>
              <Typography variant="body2" component="span" sx={{ color: 'success.main' }}>
                {product.discount}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Envío gratis
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mb: 3 }}>
              Selecciona el color y talla para conocer cuando te llega.
            </Typography>

            {/* Size Selection */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Talla:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  onClick={() => handleSizeSelect(size)}
                  sx={{
                    minWidth: '60px',
                    bgcolor: selectedSize === size ? 'black' : 'transparent',
                    color: selectedSize === size ? 'white' : 'black',
                    borderColor: 'black',
                    '&:hover': {
                      bgcolor: selectedSize === size ? 'black' : 'transparent',
                      borderColor: 'black',
                    }
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>

            {/* Quantity Selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="subtitle1">Cantidad:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                <IconButton onClick={() => handleQuantityChange(-1)} size="small">
                  -
                </IconButton>
                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange(1)} size="small">
                  +
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleBuyNow}
              sx={{
                mb: 2,
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#45a049' },
                borderRadius: '4px',
                py: 1.5
              }}
            >
              Pedir Producto
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                borderColor: 'black',
                color: 'black',
                '&:hover': {
                  borderColor: 'black',
                  bgcolor: 'transparent'
                },
                borderRadius: '4px',
                py: 1.5
              }}
            >
              Agregar al carrito
            </Button>

            {/* Description */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1, mb: 2 }}>
                DESCRIPCIÓN
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductoDetalle;
