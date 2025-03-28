import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#B85353',
        color: 'white',
        py: 3,
        mt: 'auto',
        marginTop: '5rem'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © 2025 MAYORSTORE. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
