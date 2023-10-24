import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import { patientService } from "@/services/patientService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function ConfigurationManagement() {
  const [patientId, setPatientId] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    fechaNacimiento: "1990-09-29",
    sexo: "MASCULINO",
    telefono: "937581949",
    estado: 1,
    codigoSeguro: "",
    tipoSeguro: "Pacífico",
    correo: "javier@gmail.com",
    direccion: "Av. Vulcano 115, Ate Vitarte",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fechaNacimiento: date,
    });
  };

  const handleTestService = async () => {
    setError(null);
    try {
      const patient = await patientService.create(formData);
      setPatientId(patient.patientId);
    } catch (error) {
      console.error("Error al registrar el paciente:", error);
      setError(`Error al registrar el paciente: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Registro de Paciente
      </Typography>
      <form>
        <TextField
          label="Nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido Paterno"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido Materno"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 8, pattern: "\\d*" }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de Nacimiento"
            value={formData.fechaNacimiento}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <RadioGroup
          row
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        >
          <FormControlLabel value="M" control={<Radio />} label="Masculino" />
          <FormControlLabel value="F" control={<Radio />} label="Femenino" />
        </RadioGroup>
        <TextField
          label="Código Seguro"
          name="codigoSeguro"
          value={formData.codigoSeguro}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ pattern: "\\d*" }}
        />
        <Button variant="contained" color="primary" onClick={handleTestService}>
          Registrar Paciente
        </Button>
      </form>
      {patientId !== null && (
        <div>
          <Typography variant="h6" gutterBottom>
            Paciente registrado con éxito. ID del paciente: {patientId}
          </Typography>
        </div>
      )}
      {error && (
        <div>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </div>
      )}
    </MainLayout>
  );
}
