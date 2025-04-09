import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Navbar from './Navbar';
import axios from 'axios';

const Carrito = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { currency } = useCurrency();

  const [convertedCartItems, setConvertedCartItems] = useState(cartItems);

  useEffect(() => {
    const convertCartPrices = async () => {
      try {
        // Filtrar items que necesitan conversión (están en MXN)
        const itemsToConvert = cartItems.filter(item => item.currency !== currency);
        
        if (itemsToConvert.length === 0) {
          setConvertedCartItems(cartItems);
          return;
        }

        // Obtener los precios convertidos
        const convertedItems = await Promise.all(
          cartItems.map(async (item) => {
            if (item.currency === currency) {
              return item; // Ya está en la moneda actual
            }

            try {
              const response = await axios.get(`http://127.0.0.1:8000/api/Productos/${item.id}/?currency=${currency}`);
              return {
                ...item,
                price: response.data.price,
                currency: currency
              };
            } catch (error) {
              console.error('Error converting price:', error);
              return item;
            }
          })
        );

        setConvertedCartItems(convertedItems);
      } catch (error) {
        console.error('Error converting cart prices:', error);
        setConvertedCartItems(cartItems);
      }
    };

    convertCartPrices();
  }, [cartItems, currency]);

  const formatPrice = (price) => {
    if (!price) return '';
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericPrice);
  };

  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Add 7 days
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Box>
      <Navbar />
      {cartItems.length === 0 ? (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" align="center">
            Tu carrito está vacío
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            CARRITO
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              {convertedCartItems.map((item) => (
                <Box key={`${item.id}-${item.size}`} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box
                      component="img"
                      src={item.images[0]}
                      alt={item.name}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            ID: {item.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            MARCA: Luis Vuitron
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            TALLA: {item.size} 
                          </Typography>
                        </Box>
                        <Typography variant="h6">
                          {formatPrice(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ px: 2 }}>{item.quantity}</Typography>
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <IconButton 
                          onClick={() => removeFromCart(item.id, item.size)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '300px' } }}>
              <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Resumen
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Subtotal:</Typography>
                  <Typography>{formatPrice(getCartTotal())}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total final:</Typography>
                  <Typography variant="h6">{formatPrice(getCartTotal())}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Fecha de entrega estimada:
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {getEstimatedDeliveryDate()}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: 'black',
                    '&:hover': { bgcolor: 'black' },
                    py: 1.5,
                  }}
                >
                  Pedir ahora
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Carrito;