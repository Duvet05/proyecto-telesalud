import React, { useState } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

function CompanionFields() {
  const [relationship, setRelationship] = React.useState("");
  const [document, setDocument] = useState("");
  const [documentError, setDocumentError] = useState(false);

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
  };

  const handleDocumentChange = (event) => {
    const value = event.target.value;
    setDocument(value);
    setDocumentError(value.length !== 8);
  };

  const labels = [
    "DOCUMENTO DE IDENTIDAD",
    "NOMBRES",
    "PRIMER APELLIDO",
    "SEGUNDO APELLIDO",
  ];

  return (
    <Grid container spacing={3}>
      {labels.map((label, idx) => (
        <Grid item xs={6} key={idx}>
          <TextField
            label={label}
            variant="outlined"
            required
            fullWidth
            // Solo permitir números en el campo 'DOCUMENTO DE IDENTIDAD'
            inputProps={{
              pattern: idx === 0 ? "[0-9]*" : undefined,
              maxLength: idx === 0 ? 8 : undefined,
            }}
            error={idx === 0 && documentError}
            helperText={
              idx === 0 && documentError ? "Debe tener 8 dígitos" : ""
            }
            onChange={idx === 0 ? handleDocumentChange : undefined}
          />
        </Grid>
      ))}
      <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel>PARENTESCO</InputLabel>
          <Select
            value={relationship}
            onChange={handleRelationshipChange}
            label="PARENTESCO"
          >
            <MenuItem value={"hermano"}>Hermano</MenuItem>
            <MenuItem value={"hermana"}>Hermana</MenuItem>
            <MenuItem value={"madre"}>Madre</MenuItem>
            <MenuItem value={"padre"}>Padre</MenuItem>
            <MenuItem value={"apoderado"}>Otros</MenuItem>
            <MenuItem value={"otros"}>Otros</MenuItem>
            {/* Puedes agregar más tipos de parentesco aquí */}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default CompanionFields;
