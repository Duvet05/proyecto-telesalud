import React from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CompanionFields() {
  const [relationship, setRelationship] = React.useState("");

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
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
          <TextField label={label} variant="outlined" required fullWidth />
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
            <MenuItem value={"otros"}>Otros</MenuItem>
            {/* Puedes agregar más tipos de parentesco aquí */}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default CompanionFields;
