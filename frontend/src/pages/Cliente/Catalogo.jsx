import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, IconButton, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const Catalogo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Extract category from URL query parameters on initial load and when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    } else {
      setSelectedCategory(null);
    }
  }, [location.search]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Categoria/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products whenever selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Obtener los productos
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/Productos');
        const productsData = productsResponse.data;
        
        // Obtener todas las imágenes
        const imagesResponse = await axios.get('http://127.0.0.1:8000/api/Imagen');
        const allImages = imagesResponse.data;
        
        // Agrupar las imágenes por id_producto
        const imagesByProductId = {};
        allImages.forEach(img => {
          // Si este id_producto aún no tiene imágenes en el objeto, inicializar con un array vacío
          if (!imagesByProductId[img.id_producto]) {
            imagesByProductId[img.id_producto] = [];
          }
          // Añadir esta imagen al array correspondiente al id_producto
          imagesByProductId[img.id_producto].push(img);
        });
        
        // Para cada producto, asignar solo la primera imagen
        const productsWithImages = productsData.map(product => {
          const productImages = imagesByProductId[product.id_producto] || [];
          // Usar la primera imagen si existe, o una imagen por defecto si no
          const firstImage = productImages.length > 0 
            ? productImages[0].nombre_imagen 
            : "https://concrete.com.mx/cdn/shop/products/poloconbolsanegra_Mesadetrabajo1_300x300.png?v=1649890064";
          
          return {
            ...product,
            imagen: firstImage
          };
        });
        
        setProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intente de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    // Actualizar el estado y la URL
    setSelectedCategory(categoryId);
    
    // Actualizar la URL para reflejar la categoría seleccionada
    if (categoryId) {
      navigate(`/catalogo?category=${categoryId}`, { replace: true });
    } else {
      navigate('/catalogo', { replace: true });
    }
  };

  const handleClearCategory = () => {
    // Limpiar el filtro y actualizar la URL
    setSelectedCategory(null);
    navigate('/catalogo', { replace: true });
  };

  // Get category name for display
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id_categoria === categoryId);
    return category ? category.nombre_categoria : '';
  };

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.id_categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return parseFloat(a.precio_producto) - parseFloat(b.precio_producto);
      case 'price_desc':
        return parseFloat(b.precio_producto) - parseFloat(a.precio_producto);
      case 'name_asc':
        return a.nombre_producto.localeCompare(b.nombre_producto);
      case 'name_desc':
        return b.nombre_producto.localeCompare(a.nombre_producto);
      default:
        return 0;
    }
  });

  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Products:', filteredProducts.length);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onCategorySelect={handleCategorySelect} />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          CATÁLOGO
        </Typography>

        {/* Active Category Filter */}
        {selectedCategory && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip
              label={`Categoría: ${getCategoryName(selectedCategory)}`}
              onDelete={handleClearCategory}
              color="primary"
              sx={{ fontWeight: 'medium' }}
            />
          </Box>
        )}

        {/* Search and Sort Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortBy}
              label="Ordenar por"
              onChange={handleSort}
            >
              <MenuItem value="price_asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price_desc">Precio: Mayor a Menor</MenuItem>
              <MenuItem value="name_asc">Nombre: A-Z</MenuItem>
              <MenuItem value="name_desc">Nombre: Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Loading state */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error state */}
        {error && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {sortedProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h6">
                  No se encontraron productos {selectedCategory && `en la categoría ${getCategoryName(selectedCategory)}`}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={4} justifyContent="center">
                {sortedProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id_producto} sx={{ display: 'flex' }}>
                    <Card 
                      sx={{ 
                        width: '100%',
                        maxWidth: '350px',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: 6
                        }
                      }}
                      onClick={() => handleProductClick(product.id_producto)}
                    >
                      <Box sx={{ height: '210px', position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="210"
                          image={product.imagen}
                          alt={product.nombre_producto}
                          sx={{ objectFit: 'contain', p: 2 }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'white',
                            '&:hover': { bgcolor: 'white' }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to favorites logic here
                          }}
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, height: '190px' }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          mb: 1
                        }}>
                          {product.nombre_producto}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2, 
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                            height: '40px'
                          }}
                        >
                          {product.descripcion_producto}
                        </Typography>
                        <Box sx={{ mt: 'auto' }}>
                          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                            ${parseFloat(product.precio_producto).toFixed(2)} MXN
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            Categoría: {product.detalle_id_categoria.nombre_categoria}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* No products found */}
        {!loading && !error && sortedProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography>No se encontraron productos que coincidan con la búsqueda.</Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Catalogo;