import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/Categoria/');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryMenuOpen = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchor(null);
  };

  const handleCategorySelect = (categoryId) => {
    handleCategoryMenuClose();
    
    // Siempre navegar a la página del catálogo
    if (categoryId) {
      // Si hay una categoría seleccionada, navegar con el parámetro de categoría
      navigate(`/catalogo?category=${categoryId}`);
    } else {
      // Si se selecciona "Todas las categorías", navegar sin parámetro
      navigate('/catalogo');
    }
    
    // Si estamos en la página del catálogo y hay una función de callback, llamarla
    if (location.pathname.includes('/catalogo') && onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        {/* Left side - Logo and Categories */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/main')}
          >
            MAYORSTORE
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleCategoryMenuOpen}
              sx={{ color: 'white' }}
            >
              Catálogo
            </Button>
            <Menu
              anchorEl={categoryMenuAnchor}
              open={Boolean(categoryMenuAnchor)}
              onClose={handleCategoryMenuClose}
              MenuListProps={{
                'aria-labelledby': 'categories-button',
              }}
            >
              <MenuItem 
                onClick={() => handleCategorySelect(null)}
                data-category-id="all"
              >
                Todas las categorías
              </MenuItem>
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Cargando...
                </MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem 
                    key={category.id_categoria} 
                    onClick={() => handleCategorySelect(category.id_categoria)}
                    data-category-id={category.id_categoria}
                  >
                    {category.nombre_categoria}
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Box>

        {/* Right side - Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              sx={{ 
                color: 'white', 
                display: { xs: 'none', sm: 'block' },
                cursor: 'pointer'
              }}
              onClick={() => navigate('/mis-pedidos')}
            >
              Mis Pedidos
            </Typography>
          </Box>
          <IconButton onClick={() => navigate('/favoritos')}>
            <FavoriteIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton>
            <PersonIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;