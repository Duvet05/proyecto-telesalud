import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const patientFieldsConfig = [
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "tipoSeguro", label: "TIPO DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO", type: "date" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
  {
    name: "sexo",
    label: "SEXO",
    type: "select",
    options: ["Femenino", "Masculino", "Otro"],
  },
];

function PatientFieldsAppointment({
  isDisabled,
  patientData = {},
  onFormDataChange,
}) {
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
    updateFormData(name, value);
  };

  const handleDateChange = (name, value) => {
    updateFormData(name, value ? value.format("YYYY-MM-DD") : "");
  };

  const updateFormData = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      onFormDataChange(updatedData);
      return updatedData;
    });
  };

  return (
    <Grid container spacing={4}>
      {patientFieldsConfig.map((field) => (
        <Grid item xs={4} key={field.name}>
          {field.name === "tipoSeguro" ? (
            <FormControl fullWidth variant="outlined">
              <InputLabel>{field.label}</InputLabel>
              <Select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                disabled={isDisabled}
                label={field.label}
              >
                <MenuItem value={"Seguro A"}>Seguro A</MenuItem>
                <MenuItem value={"Seguro B"}>Seguro B</MenuItem>
                <MenuItem value={"Seguro C"}>Seguro C</MenuItem>
              </Select>
            </FormControl>
          ) : field.name === "fechaNacimiento" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={field.label}
                value={
                  formData[field.name] ? dayjs(formData[field.name]) : null
                }
                onChange={(newValue) => handleDateChange(field.name, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    disabled={isDisabled}
                  />
                )}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              name={field.name}
              label={field.label}
              variant="outlined"
              required
              fullWidth
              disabled={isDisabled}
              value={formData[field.name]}
              onChange={handleInputChange}
              inputProps={
                field.name === "dni"
                  ? {
                      pattern: "[0-9]*",
                      maxLength: 8,
                    }
                  : undefined
              }
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default PatientFieldsAppointment;
