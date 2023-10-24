import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import axios from "axios";

export default function ConfigurationManagement() {
  const [patientId, setPatientId] = useState(null);
  const [error, setError] = useState(null);

  const handleTestService = async () => {
    setError(null);
    try {
      const data = {
        nombres: "gaaaUpdate",
        apellidoPaterno: "gaaaUpdate",
        apellidoMaterno: "gaaaUpdate",
        dni: "70336303",
        fechaNacimiento: "1990-09-29",
        sexo: "MASCULINO",
        telefono: "937581947",
        estado: 1,
        tipoSeguro: "Pacífico",
        codigoSeguro: "156",
        correo: "javier.mendez@gmail.com",
        direccion: "Av. Vulcano 115, Ate Vitarte",
        programacionesCitas: null,
      };
      const response = await axios.put(
        "http://localhost:8080/admision/put/paciente",
        data
      );
      setPatientId(response.data.patientId);
    } catch (error) {
      console.error("Error al llamar al servicio:", error);
      // Capturando errores específicos del servidor
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        setError(
          `Error al registrar el paciente: ${
            error.response.data.message || error.message
          }`
        );
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error("Error Request:", error.request);
        setError(
          "Error al registrar el paciente: No se recibió respuesta del servidor"
        );
      } else {
        // Algo sucedió al configurar la petición y provocó un error
        console.error("Error Message:", error.message);
        setError(`Error al registrar el paciente: ${error.message}`);
      }
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Registro de Paciente
      </Typography>
      <form>
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
