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
  { label: "DOCUMENTO DE IDENTIDAD", pattern: "[0-9]*", maxLength: 8 },
  "NOMBRES",
  "PRIMER APELLIDO",
  "SEGUNDO APELLIDO",
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
    // Llama a la función de devolución de llamada para enviar los datos del acompañante al padre
    onCompanionDataReceived(companionData);
  }, [companionData, onCompanionDataReceived]);

  const handleDocumentChange = (event) => {
    const value = event.target.value;
    setDocumentError(value.length !== 8);
    setCompanionData((prevData) => ({
      ...prevData,
      documentoIdentidad: value,
    }));
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setCompanionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Grid container spacing={3}>
      {companionFieldsConfig.map((field, idx) => (
        <Grid item xs={6} key={idx}>
          <TextField
            label={typeof field === "string" ? field : field.label}
            variant="outlined"
            required
            fullWidth
            inputProps={{
              pattern: idx === 0 ? field.pattern : undefined,
              maxLength: idx === 0 ? field.maxLength : undefined,
            }}
            error={idx === 0 && documentError}
            helperText={
              idx === 0 && documentError ? "Debe tener 8 dígitos" : ""
            }
            onChange={(e) =>
              idx === 0 ? handleDocumentChange(e) : handleInputChange(e, field)
            }
          />
        </Grid>
      ))}
      <Grid item xs={6}>
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
