import React from "react";
import { Box, Typography, Grid, Button, TextField, Container, Paper } from "@mui/material";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

// Componente Campo reutilizable
const Campo = ({ id, label, type, iconButton }) => (
  <Box>
    <label htmlFor={id}>{label}</label>
    {iconButton ? (
      <Box>
        <TextField
          type={type}
          id={id}
          name={id}
          variant="outlined"
          required
          fullWidth
          readOnly
          disabled
        />
      </Box>
    ) : (
      <TextField
        type={type}
        id={id}
        name={id}
        variant="outlined"
        required
        fullWidth
        disabled
      />
    )}
  </Box>
);

// Campos para el paciente
const camposPaciente = [
  {
    id: "numero-documento-paciente",
    label: "N° documento",
    type: "tel",
    iconButton: true,
  },
  {
    id: "codigo-asegurado-sis",
    label: "Código del asegurado SIS",
    type: "text",
    iconButton: false,
  },
  {
    id: "apellido-paterno",
    label: "Apellido paterno",
    type: "text",
    iconButton: false,
  },
  {
    id: "apellido-materno",
    label: "Apellido materno",
    type: "text",
    iconButton: false,
  },
  { id: "nombres", label: "Nombres", type: "text", iconButton: false },
];

// Campos para la atención
const camposAtencion = [
  {
    id: "numero-cita",
    label: "Número de cita",
    type: "text",
    iconButton: false,
  },
  {
    id: "fecha-atencion",
    label: "Fecha de atención",
    type: "date",
    iconButton: false,
  },
  {
    id: "hora-atencion",
    label: "Hora de atención",
    type: "time",
    iconButton: false,
  },
  {
    id: "medico-responsable",
    label: "Médico responsable",
    type: "text",
    iconButton: true,
  },
  {
    id: "especialidad",
    label: "Especialidad",
    type: "text",
    iconButton: false,
  },
  { id: "estado", label: "Estado", type: "text", iconButton: false },
];

function AppointmentInfo() {
  return (
    <MainLayout>
      {" "}

      <Container>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Detalle de la cita
          </Typography>
          <hr />
          <div>
            {/* Sección: Ver información de cita */}
            <Box sx={{ marginBottom: 4, color: "black" }}>
              <Typography variant="h5" gutterBottom>
                Información del paciente
              </Typography>
              <Grid container spacing={3}>
                {camposPaciente.map((campo) => (
                  <Grid item xs={4} key={campo.id}>
                    <Campo {...campo} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Sección: Información de la atención */}
            <Box sx={{ marginBottom: 4, color: "black" }}>
              <Typography variant="h5" gutterBottom>
                Información de la atención
              </Typography>
              <Grid container spacing={3}>
                {camposAtencion.map((campo) => (
                  <Grid item xs={4} key={campo.id}>
                    <Campo {...campo} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Botón para volver a la página principal de citas */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/AppointmentManagement">
                <Button variant="contained" color="primary">
                  Terminar
                </Button>
              </Link>
            </div>
          </div>
        </Paper>
      </Container>
    </MainLayout>
  );
}

export default AppointmentInfo;

