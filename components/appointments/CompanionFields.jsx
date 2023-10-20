import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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

function CompanionFields({ onCompanionDataReceived }) {
  const [relationship, setRelationship] = useState("");
  const [documentError, setDocumentError] = useState(false);
  const [companionData, setCompanionData] = useState({
    documentoIdentidad: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
  });

  useEffect(() => {
    onCompanionDataReceived(companionData);
  }, [companionData, onCompanionDataReceived]);

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

  const renderTextField = (field) => (
    <TextField
      label={field.label}
      variant="outlined"
      required
      fullWidth
      name={field.name}
      inputProps={{
        pattern: field.pattern,
        maxLength: field.maxLength,
      }}
      error={field.name === "documentoIdentidad" ? documentError : false}
      helperText={
        field.name === "documentoIdentidad" && documentError
          ? "Debe tener 8 dígitos"
          : ""
      }
      onChange={(e) => handleInputChange(e, field.name)}
    />
  );

  return (
    <Grid container spacing={4}>
      {companionFieldsConfig.map((field, index) => (
        <Grid item xs={4} key={index}>
          {field.label === "DOCUMENTO DE IDENTIDAD" ? (
            renderTextField(field)
          ) : (
            <TextField
              label={field.label}
              variant="outlined"
              required
              fullWidth
              name={field.name}
              onChange={(e) => handleInputChange(e, field.name)}
            />
          )}
        </Grid>
      ))}
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel>PARENTESCO</InputLabel>
          <Select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
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
