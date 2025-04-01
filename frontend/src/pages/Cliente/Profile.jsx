import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userEmail = localStorage.getItem('userEmail') || 'usuario@email.com';
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                mr: 2
              }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {userName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userEmail}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogoutClick}
              fullWidth
              sx={{ mt: 2 }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro que deseas cerrar la sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
