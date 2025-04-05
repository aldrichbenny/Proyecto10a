import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        // Get user's wishlist
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          navigate('/');
          return;
        }
        const user = JSON.parse(userStr);
        console.log('Current user:', user);

        // Get user role details
        const roleResponse = await axios.get(`http://127.0.0.1:8000/api/Roles/${user.id_rol}`);
        const roleDetails = roleResponse.data;
        
        // Create user details object
        const userDetails = {
          id_usuario: user.id_usuario,
          correo: user.correo,
          id_rol: user.id_rol,
          detalle_id_rol: roleDetails
        };
        
        // Get or create wishlist for user
        const wishlistResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist/');
        console.log('All wishlists:', wishlistResponse.data);
        
        let userWishlist = wishlistResponse.data.find(w => w.id_usuario === user.id_usuario);
        console.log('User wishlist:', userWishlist);
        
        if (!userWishlist) {
          // Get max wishlist ID
          const maxWishlistId = wishlistResponse.data.reduce((max, w) => 
            Math.max(max, w.id_wishlist), 0);

          console.log('Creating new wishlist for user:', user.id_usuario);
          const newWishlistResponse = await axios.post('http://127.0.0.1:8000/api/Wishlist/', {
            id_wishlist: maxWishlistId + 1,
            id_usuario: user.id_usuario,
            detalle_id_usuario: userDetails
          });
          userWishlist = newWishlistResponse.data;
          console.log('Created wishlist:', userWishlist);
        }

        // Get wishlist products
        const wishlistProductsResponse = await axios.get('http://127.0.0.1:8000/api/Wishlist_producto/');
        console.log('All wishlist products:', wishlistProductsResponse.data);
        
        const userWishlistProducts = wishlistProductsResponse.data.filter(
          wp => wp.id_wishlist === userWishlist.id_wishlist
        );
        console.log('User wishlist products:', userWishlistProducts);

        // Get all products
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/Productos/');
        const allProducts = productsResponse.data;
        console.log('All products:', allProducts);

        // Get all images
        const imagesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        const allImages = imagesResponse.data;

        // Create map of images by product ID
        const imagesByProductId = {};
        allImages.forEach(img => {
          const productId = parseInt(img.id_producto);
          if (!imagesByProductId[productId]) {
            imagesByProductId[productId] = [];
          }
          imagesByProductId[productId].push(img);
        });

        // Map wishlist products to full product details
        const productsWithDetails = userWishlistProducts
          .map(wp => {
            if (!wp.id_producto) {
              console.log('Invalid wishlist product:', wp);
              return null;
            }

            const productId = parseInt(wp.id_producto);
            const product = allProducts.find(p => parseInt(p.id_producto) === productId);
            
            if (!product) {
              console.log('Product not found:', productId);
              // Remove invalid wishlist item
              axios.delete(`http://127.0.0.1:8000/api/Wishlist_producto/${wp.id_wishlist_producto}/`)
                .then(() => console.log('Removed invalid wishlist item'))
                .catch(err => console.error('Error removing invalid wishlist item:', err));
              return null;
            }

            const productImages = imagesByProductId[productId] || [];
            const firstImage = productImages.length > 0 
              ? productImages[0].nombre_imagen 
              : "https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064";

            return {
              ...product,
              imagen: firstImage,
              wishlist_producto_id: wp.id_wishlist_producto
            };
          })
          .filter(Boolean);

        console.log('Final products with details:', productsWithDetails);
        setWishlistItems(productsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        if (err.response) {
          console.log('Error response:', err.response.data);
        }
        setError('Error loading wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemoveFromWishlist = async (wishlistProductId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/Wishlist_producto/${wishlistProductId}/`);
      setWishlistItems(prevItems => 
        prevItems.filter(item => item.wishlist_producto_id !== wishlistProductId)
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Wishlist
        </Typography>
        {wishlistItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your wishlist is empty
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id_producto}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                  onClick={() => handleProductClick(item.id_producto)}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 260,
                      objectFit: 'contain',
                      bgcolor: '#f5f5f5'
                    }}
                    image={item.imagen}
                    alt={item.nombre}
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(item.wishlist_producto_id);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'white' },
                      zIndex: 1
                    }}
                  >
                    <FavoriteIcon sx={{ color: 'black' }} />
                  </IconButton>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.nombre}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${item.precio.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.marca}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: item.estado_producto === 'Disponible' ? 'green' : 'red',
                      mt: 1,
                      fontWeight: 'medium'
                    }}>
                      {item.estado_producto}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Wishlist;