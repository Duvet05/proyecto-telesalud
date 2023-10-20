import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Paper,
  InputLabel,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useAppointments } from "./AppointmentsContext";
import { appointmentService } from "@/services/appointmentService";

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
  const theme = useTheme(); // Use theme for consistent styling
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
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointmentService.registrarCita({
        id_cita: 1, // O cualquier valor que desees
        idPaciente: pacienteData.id, // Asumiendo que `pacienteData` tiene un id
        idMedico: doctorResponsable.id, // Asumiendo que `doctorResponsable` tiene un id
        codigoCitaMedica: "CM-123", // O cualquier valor que desees
        tipoCita: "MEDICA", // Debes obtener este dato desde alguna parte
        horaCita: appointmentData.selectedHour,
        fechaCita: appointmentData.selectedDate,
        requiereTriaje: 0, // O cualquier valor que desees
        estado: 1, // O cualquier estado inicial que desees
      });

      if (response && response.success) {
        console.log("Cita registrada con éxito.");
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito.
      } else {
        throw new Error("No se pudo registrar la cita.");
      }
    } catch (err) {
      console.error("Error al registrar la cita:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: theme.spacing(3) }}>
        <Box sx={{ marginBottom: 4, color: "black" }}>
          <Typography variant="h5" gutterBottom>
            Información del paciente
          </Typography>
          <Grid container spacing={3}>
            {patientFieldsConfig.map((campo) => (
              <Grid item xs={4} key={campo.name}>
                <InputLabel htmlFor={campo.name}>{campo.label}</InputLabel>
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
                <InputLabel htmlFor={campo.id}>{campo.label}</InputLabel>
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
        >
          Registrar Cita
        </Button>

        {error && <Typography color="error">{error}</Typography>}
        <Link href="/AppointmentManagement" passHref>
          <Button variant="contained" color="secondary" fullWidth>
            Terminar
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}

export default AppointmentInfo;
