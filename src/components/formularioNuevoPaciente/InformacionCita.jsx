import React from 'react';
import { styled } from '@mui/system';
import { TextField, Typography, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
}));

const Seccion = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4), // Espacio entre secciones
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

function InformacionCita() {
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Ver información de cita</Typography>
      
      {/* Sección: Ver información de cita */}
      <Seccion>
        <Typography variant="h6" gutterBottom>Información del paciente</Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
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
                  disabled
                  style={{ backgroundColor: '#b9b9b9' }}
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </PacienteBotones>
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="codigo-asegurado-sis">Código del asegurado SIS</label>
              <TextField
                type="text"
                id="codigo-asegurado-sis"
                name="codigo-asegurado-sis"
                variant="outlined"
                required
                fullWidth
                readOnly
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="apellido-paterno">Apellido paterno</label>
              <TextField
                type="text"
                id="apellido-paterno"
                name="apellido-paterno"
                variant="outlined"
                required
                fullWidth
                readOnly
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="apellido-materno">Apellido materno</label>
              <TextField
                type="text"
                id="apellido-materno"
                name="apellido-materno"
                variant="outlined"
                required
                fullWidth
                readOnly
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="nombres">Nombres</label>
              <TextField
                type="text"
                id="nombres"
                name="nombres"
                variant="outlined"
                required
                fullWidth
                readOnly
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
        </Grid>
      </Seccion>
      {/* Sección: Información de la atención */}
      <Seccion>
        <Typography variant="h6" gutterBottom margin={"1.5rem 0rem"}>Información de la atención</Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="numero-cita">Número de cita</label>
              <TextField
                type="text"
                id="numero-cita"
                name="numero-cita"
                variant="outlined"
                required
                fullWidth
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="fecha-atencion">Fecha de atención</label>
              <TextField
                type="date"
                id="fecha-atencion"
                name="fecha-atencion"
                variant="outlined"
                required
                fullWidth
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="hora-atencion">Hora de atención</label>
              <TextField
                type="time"
                id="hora-atencion"
                name="hora-atencion"
                variant="outlined"
                required
                fullWidth
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="medico-responsable">Médico responsable</label>
              <PacienteBotones>
                <TextField
                  type="text"
                  id="medico-responsable"
                  name="medico-responsable"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  style={{ backgroundColor: '#b9b9b9' }}
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </PacienteBotones>
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="especialidad">Especialidad</label>
              <TextField
                type="text"
                id="especialidad"
                name="especialidad"
                variant="outlined"
                required
                fullWidth
                disabled
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
          <Grid item xs={4}>
            <Campo>
              <label htmlFor="estado">Estado</label>
              <TextField
                type="text"
                id="estado"
                name="estado"
                variant="outlined"
                required
                fullWidth
                readOnly
                style={{ backgroundColor: '#b9b9b9' }}
              />
            </Campo>
          </Grid>
        </Grid>
      </Seccion>
      
      
    </Container>
  );
}

export default InformacionCita;
