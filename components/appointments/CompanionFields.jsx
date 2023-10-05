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
  "DOCUMENTO DE IDENTIDAD",
  "NOMBRES",
  "PRIMER APELLIDO",
  "SEGUNDO APELLIDO",
];

function CompanionFields() {
  const [relationship, setRelationship] = useState("");
  const [document, setDocument] = useState("");
  const [documentError, setDocumentError] = useState(false);

  const handleDocumentChange = (event) => {
    const value = event.target.value;
    setDocument(value);
    setDocumentError(value.length !== 8);
  };

  return (
    <Grid container spacing={3}>
      {companionFieldsConfig.map((label, idx) => (
        <Grid item xs={6} key={idx}>
          <TextField
            label={label}
            variant="outlined"
            required
            fullWidth
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
