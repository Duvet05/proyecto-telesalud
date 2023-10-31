import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useAppointments } from "@/context/AppointmentsContext";

const companionFieldsConfig = [
  {
    name: "documentoIdentidad",
    label: "DOCUMENTO DE IDENTIDAD",
    pattern: "[0-9]*",
    maxLength: 8,
  },
  { name: "nombres", label: "NOMBRES" },
  { name: "primerApellido", label: "PRIMER APELLIDO" },
  { name: "segundoApellido", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO", type: "date" },
  {
    name: "relationship",
    label: "PARENTESCO",
    type: "select",
    options: ["Hermano", "Hermana", "Madre", "Padre", "Apoderado", "Otros"],
  },
];

function CompanionInfo() {
  const { appointmentData, setAppointmentData } = useAppointments();

  const initialState = companionFieldsConfig.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState({
    ...initialState,
    ...appointmentData.companionData,
  });
  const [isLegalResponsible, setIsLegalResponsible] = useState("yes");

  useEffect(() => {
    if (isLegalResponsible === "yes") {
      setFormData(initialState);
      setAppointmentData((prev) => ({ ...prev, companionData: null }));
    } else if (!appointmentData.companionData) {
      setFormData(initialState);
    }
  }, [isLegalResponsible]);

  const updateAppointmentData = (companionData) => {
    if (
      JSON.stringify(appointmentData.companionData) !==
      JSON.stringify(companionData)
    ) {
      setAppointmentData((prevData) => ({
        ...prevData,
        companionData,
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleDateChange = (name, value) => {
    updateFormData(name, value);
  };
  const updateFormData = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      const hasCompanion = Object.values(updatedData).some((v) => v);
      const companionData = hasCompanion
        ? {
            tieneAcompanhante: true,
            nombreAcompanhante:
              `${updatedData.nombres} ${updatedData.primerApellido} ${updatedData.segundoApellido}`.trim(),
            dniAcompanhante: updatedData.documentoIdentidad,
            parentezco: updatedData.relationship,
          }
        : null;
      updateAppointmentData(companionData);
      return updatedData;
    });
  };
  const isDisabled = false;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        ¿El paciente es responsable legal?
      </Typography>
      <RadioGroup
        row
        value={isLegalResponsible}
        onChange={(e) => setIsLegalResponsible(e.target.value)}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      {isLegalResponsible === "no" && (
        <Grid container spacing={4}>
          {companionFieldsConfig.map((field) => (
            <Grid item xs={4} key={field.name}>
              {field.type === "date" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={field.label}
                    value={
                      formData[field.name] ? dayjs(formData[field.name]) : null
                    }
                    onChange={(newValue) =>
                      handleDateChange(field.name, newValue)
                    }
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
              ) : field.type === "select" ? (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    field.pattern
                      ? {
                          pattern: field.pattern,
                          maxLength: field.maxLength,
                        }
                      : undefined
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default CompanionInfo;
