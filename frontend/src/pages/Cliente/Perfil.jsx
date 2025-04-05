import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Grid, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Perfil = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setError('No se encontró información del usuario');
          return;
        }

        const user = JSON.parse(userStr);
        const response = await axios.get('http://127.0.0.1:8000/api/Perfil/');
        const userProfile = response.data.find(profile => 
          profile.detalle_id_usuario.correo === user.correo
        );

        if (!userProfile) {
          setError('No se encontró el perfil del usuario');
          return;
        }

        setProfileData(userProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error al cargar el perfil');
      }
    };

    fetchProfileData();
  }, []);

  const handleLogoutClick = () => {
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

  if (error) {
    return (
      <>
        <Navbar />
        <Typography color="error">{error}</Typography>
      </>
    );
  }

  if (!profileData) {
    return (
      <>
        <Navbar />
        <Typography>Cargando perfil...</Typography>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom align="center">
                {profileData.nombre} {profileData.apellido_pat} {profileData.apellido_mat}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Correo electrónico
              </Typography>
              <Typography variant="body1" gutterBottom>
                {profileData.detalle_id_usuario.correo}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Teléfono
              </Typography>
              <Typography variant="body1" gutterBottom>
                {profileData.telefono}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary">
                Dirección
              </Typography>
              <Typography variant="body1" gutterBottom>
                {profileData.direccion}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary">
                Tipo de usuario
              </Typography>
              <Typography variant="body1" gutterBottom>
                {profileData.detalle_id_usuario.detalle_id_rol.nombre_rol}
              </Typography>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogoutClick}
                sx={{ minWidth: 200 }}
              >
                Cerrar Sesión
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro que deseas cerrar sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancelar</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Perfil;