import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

const patientFieldsConfig = [
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
];

function PatientFields({ isDisabled, patientData = {} }) {
  const initialState = patientFieldsConfig.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState({ ...initialState, ...patientData });

  useEffect(() => {
    setFormData((prev) =>
      patientData ? { ...prev, ...patientData } : initialState
    );
  }, [patientData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      {patientFieldsConfig.map((field) => (
        <Grid item xs={4} key={field.name}>
          <TextField
            name={field.name}
            label={field.label}
            variant="outlined"
            required
            fullWidth
            disabled={isDisabled}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PatientFields;
