import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
} from "@mui/material";
import Link from "next/link";

const camposPaciente = [
  { id: "numero-documento-paciente", label: "N° documento", type: "tel" },
  {
    id: "codigo-asegurado-sis",
    label: "Código del asegurado SIS",
    type: "text",
  },
  { id: "apellido-paterno", label: "Apellido paterno", type: "text" },
  { id: "apellido-materno", label: "Apellido materno", type: "text" },
  { id: "nombres", label: "Nombres", type: "text" },
];

const camposAtencion = [
  { id: "numero-cita", label: "Número de cita", type: "text" },
  { id: "fecha-atencion", label: "Fecha de atención", type: "date" },
  { id: "hora-atencion", label: "Hora de atención", type: "time" },
  { id: "medico-responsable", label: "Médico responsable", type: "text" },
  { id: "especialidad", label: "Especialidad", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

function AppointmentInfo() {
  return (
    <Container>
      <Box sx={{ marginBottom: 4, color: "black" }}>
        <Typography variant="h5" gutterBottom>
          Información del paciente
        </Typography>
        <Grid container spacing={3}>
          {camposPaciente.map((campo) => (
            <Grid item xs={4} key={campo.id}>
              <label htmlFor={campo.id}>{campo.label}</label>
              <TextField
                type={campo.type}
                id={campo.id}
                name={campo.id}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginBottom: 4, color: "black" }}>
        <Typography variant="h5" gutterBottom>
          Información de la atención
        </Typography>
        <Grid container spacing={3}>
          {camposAtencion.map((campo) => (
            <Grid item xs={4} key={campo.id}>
              <label htmlFor={campo.id}>{campo.label}</label>
              <TextField
                type={campo.type}
                id={campo.id}
                name={campo.id}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Link href="/AppointmentManagement">
        <Button variant="contained" color="secondary" fullWidth>
          Terminar
        </Button>
      </Link>
    </Container>
  );
}

export default AppointmentInfo;
