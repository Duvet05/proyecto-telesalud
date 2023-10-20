import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAppointments } from "@/pages/AppointmentsContext";

const companionFieldsConfig = [
  {
    label: "DOCUMENTO DE IDENTIDAD",
    pattern: "[0-9]*",
    maxLength: 8,
    name: "documentoIdentidad",
  },
  {
    label: "NOMBRES",
    name: "nombres",
  },
  {
    label: "PRIMER APELLIDO",
    name: "primerApellido",
  },
  {
    label: "SEGUNDO APELLIDO",
    name: "segundoApellido",
  },
  {
    label: "FECHA DE NACIMIENTO",
    name: "fechaNacimiento",
  },
];

function CompanionFields() {
  const { setAppointmentData } = useAppointments();

  const [companionData, setCompanionData] = useState({
    documentoIdentidad: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    relationship: "",
  });
  const [documentError, setDocumentError] = useState(false);

  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;

    setCompanionData((prevData) => ({
      ...prevData,
      [fieldName || name]: value,
    }));

    if (fieldName === "documentoIdentidad") {
      setDocumentError(value.length !== 8);
    }
  };

  useEffect(() => {
    setAppointmentData((prevData) => ({
      ...prevData,
      companionData: companionData,
    }));
  }, [companionData, setAppointmentData]);

  const renderTextField = (field) => (
    <TextField
      // ... (sin cambios aquí)
      onChange={(e) => handleInputChange(e, field.name)}
    />
  );

  return (
    <Grid container spacing={4}>
      {companionFieldsConfig.map((field, index) => (
        <Grid item xs={4} key={index}>
          {renderTextField(field)}
        </Grid>
      ))}
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel>PARENTESCO</InputLabel>
          <Select
            value={companionData.relationship}
            onChange={(e) => handleInputChange(e, "relationship")}
            label="PARENTESCO"
          >
            <MenuItem value={"hermano"}>Hermano</MenuItem>
            <MenuItem value={"hermana"}>Hermana</MenuItem>
            <MenuItem value={"madre"}>Madre</MenuItem>
            <MenuItem value={"padre"}>Padre</MenuItem>
            <MenuItem value={"apoderado"}>Apoderado</MenuItem>
            <MenuItem value={"otros"}>Otros</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default CompanionFields;
