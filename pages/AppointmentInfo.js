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
import { useAppointments } from "./AppointmentsContext";

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

const camposAtencion = [
  { id: "numero-cita", label: "Número de cita", type: "text" },
  { id: "fecha-atencion", label: "Fecha de atención", type: "date" },
  { id: "hora-atencion", label: "Hora de atención", type: "time" },
  { id: "medico-responsable", label: "Médico responsable", type: "text" },
  { id: "especialidad", label: "Especialidad", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

function AppointmentInfo() {
  const { appointmentData } = useAppointments();
  const pacienteData = appointmentData.selectedPatientData;
  const doctorResponsable = appointmentData.selectedDoctor;
  const nombreDoctor = doctorResponsable
    ? `${doctorResponsable.sexo === "M" ? "Dr." : "Dra."} ${
        doctorResponsable.nombres
      } ${doctorResponsable.apellidoPaterno} ${
        doctorResponsable.apellidoMaterno
      }`
    : "";
  const especialidadNombre =
    doctorResponsable && doctorResponsable.especialidad
      ? doctorResponsable.especialidad.nombre
      : "";
  return (
    <Container>
      <Box sx={{ marginBottom: 4, color: "black" }}>
        <Typography variant="h5" gutterBottom>
          Información del paciente
        </Typography>
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
                defaultValue={
                  campo.id === "fecha-atencion"
                    ? appointmentData.selectedDate
                    : campo.id === "hora-atencion"
                    ? appointmentData.selectedHour
                    : campo.id === "medico-responsable"
                    ? nombreDoctor
                    : campo.id === "estado"
                    ? "PENDIENTE"
                    : campo.id === "especialidad"
                    ? especialidadNombre
                    : appointmentData[campo.id]
                }
                InputProps={{ readOnly: true }}
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
