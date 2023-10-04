import React from "react";
import { Box, TextField, Typography, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const softBlue = "#e6f7ff"; // Azul suave
const labelColor = "#666"; // Color de etiqueta

const Campo = ({ id, label, type, iconButton }) => {
  const inputStyles = {
    backgroundColor: softBlue,
    "& input": {
      color: labelColor,
    },
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        display: "flex",
        alignItems: "flex-start", // Alinea los labels en la parte superior
      }}
    >
      <label
        htmlFor={id}
        style={{
          width: "120px", // Ancho fijo para el label
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: labelColor,
          marginRight: "8px", // Espacio entre el label y el campo
        }}
      >
        {label}
      </label>
      {iconButton ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type={type}
            id={id}
            name={id}
            variant="outlined"
            required
            fullWidth
            readOnly
            disabled
            sx={inputStyles}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
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
          sx={inputStyles}
        />
      )}
    </Box>
  );
};

function InformacionCita() {
  const pacienteCampos = [
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
    {
      id: "nombres",
      label: "Nombres",
      type: "text",
      iconButton: false,
    },
  ];

  const atencionCampos = [
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
    {
      id: "estado",
      label: "Estado",
      type: "text",
      iconButton: false,
    },
  ];

  return (
    <div>
      {/* Sección: Ver información de cita */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Información del paciente
        </Typography>
        <Grid container spacing={3}>
          {pacienteCampos.map((campo) => (
            <Grid item xs={4} key={campo.id}>
              <Campo {...campo} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Sección: Información de la atención */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: 4 }}>
          Información de la atención
        </Typography>
        <Grid container spacing={3}>
          {atencionCampos.map((campo) => (
            <Grid item xs={4} key={campo.id}>
              <Campo {...campo} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default InformacionCita;
