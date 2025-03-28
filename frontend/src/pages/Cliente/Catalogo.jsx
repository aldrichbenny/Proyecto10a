import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, IconButton, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const products = [
  {
    id: "1",
    name: 'Camisa Luis Vuitton',
    description: 'Estampado en camisa lisa',
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
    description: 'Estampado en camisa lisa',
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
    description: 'Estampado en camisa lisa',
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

const Catalogo = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          CATÁLOGO
        </Typography>

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

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" color="text.primary">
                      {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {product.originalPrice}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      {product.discount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Catalogo;