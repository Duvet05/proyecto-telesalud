import React from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Typography } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f0f0f0',
}));

const Campo = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PacienteBotones = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& button': {
    marginLeft: theme.spacing(1),
  },
}));

function PatientInfo() {
  return (
    <Container>
      <Typography variant="h4">Información del paciente</Typography>
      <Campo>
        <label htmlFor="numero-documento-paciente">N° documento</label>
        <PacienteBotones>
          <TextField
            type="tel"
            id="numero-documento-paciente"
            name="numero-documento-paciente"
            variant="outlined"
            required
            fullWidth
            readOnly
          />
          <Button variant="contained">Buscar</Button>
          <Button variant="contained">Nuevo</Button>
        </PacienteBotones>
      </Campo>
      {/* ... (resto del código, usa <Campo> donde anteriormente usabas la clase "campo") */}
    </Container>
  );
}

export default PatientInfo;
