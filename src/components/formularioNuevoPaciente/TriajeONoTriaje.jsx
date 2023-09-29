import React from 'react';
import { styled } from '@mui/system';
import { Button, Container, Grid } from '@mui/material';

const BotonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16px', // Añade un espacio entre el formulario y los botones
    '& button': {
      margin: '1rem 8rem', // Espacio más reducido entre los botones
    },
  });

function TriajeONoTriaje() {
  // Funciones para manejar los clics en los botones
  const handleNoMandarClick = () => {
    // Coloca aquí la lógica cuando se hace clic en "No mandar a triaje"
    console.log('No mandar a triaje');
  };

  const handleMandarClick = () => {
    // Coloca aquí la lógica cuando se hace clic en "Mandar a triaje"
    console.log('Mandar a triaje');
  };

  return (
    <Container>
      {/* Tu contenido del formulario */}
      <form>
        <Grid container spacing={2}>
          {/* Agrega tus campos de formulario aquí */}
        </Grid>
      </form>

      {/* Botones al lado del otro */}
      <BotonContainer>
        <Button variant="contained" color="secondary" onClick={handleNoMandarClick}>
          No mandar a triaje
        </Button>
        <Button variant="contained" color="primary" onClick={handleMandarClick}>
          Mandar a triaje
        </Button>
      </BotonContainer>
    </Container>
  );
}

export default TriajeONoTriaje;
