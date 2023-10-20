import React from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import { useAppointments } from "@/pages/AppointmentsContext";

const patientFieldsConfig = [
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "tipoSeguro", label: "TIPO DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
];

function _testAppppp() {
  const { appointmentData } = useAppointments();
  const pacienteData = appointmentData.selectedPatientData;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Información del paciente
      </Typography>
      <Box sx={{ marginBottom: 4, color: "black" }}>
        <Grid container spacing={3}>
          {patientFieldsConfig.map((campo) => (
            <Grid item xs={4} key={campo.name}>
              <label htmlFor={campo.name}>{campo.label}</label>
              <TextField
                type={campo.type}
                id={campo.name}
                name={campo.name}
                variant="outlined"
                required
                fullWidth
                defaultValue={pacienteData ? pacienteData[campo.name] : ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default _testAppppp;
