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

function CompanionInfo({
  isDisabled = false,
  companionData = {},
  onFormDataChange,
}) {
  const initialState = companionFieldsConfig.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState({
    ...initialState,
    ...companionData,
  });
  const [value, setValue] = useState("yes");

  useEffect(() => {
    setFormData((prev) =>
      companionData ? { ...prev, ...companionData } : initialState
    );
  }, [companionData]);

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
      onFormDataChange && onFormDataChange(updatedData);
      return updatedData;
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        ¿El paciente es responsable legal?
      </Typography>
      <RadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>

      {value === "no" && (
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
