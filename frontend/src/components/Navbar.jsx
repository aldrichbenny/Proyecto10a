import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

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
          <IconButton onClick={() => navigate('/carrito')}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon sx={{ color: 'white' }} />
            </Badge>
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
