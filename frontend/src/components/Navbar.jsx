import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';

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

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate('/');
    setOpenLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
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
    <AppBar position="static" sx={{ bgcolor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/catalogo')}
          >
            MAYORSTORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button 
              color="inherit"
              onClick={handleCategoryMenuOpen}
              sx={{ color: 'white' }}
            >
              Catalog
            </Button>
            <Menu
              anchorEl={categoryMenuAnchor}
              open={Boolean(categoryMenuAnchor)}
              onClose={handleCategoryMenuClose}
            >
              <MenuItem 
                onClick={() => handleCategorySelect(null)}
                data-category-id="all"
              >
                All Categories
              </MenuItem>

              {loading ? (
                <MenuItem disabled>
                  Loading...
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

          <Box sx={{ flexGrow: 0 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'block' },
                cursor: 'pointer'
              }}
              onClick={() => navigate('/mis-pedidos')}
            >
              My Orders
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, color: 'white' }}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                navigate('/perfil');
              }}>
                <PersonIcon sx={{ mr: 1 }} />
                My Profile
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <LogoutIcon sx={{ mr: 1 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to sign out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
