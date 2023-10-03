import React from "react";
import { TextField, Grid } from "@mui/material";

function PatientFields({ isDisabled }) {
  return (
    <>
      {[
        "N° documento",
        "Código del asegurado SIS",
        "N° historia clínica",
        "Apellido paterno",
        "Apellido materno",
        "Nombres",
      ].map((label, idx) => (
        <Grid item xs={4} key={idx}>
          <TextField
            label={label}
            variant="outlined"
            required
            fullWidth
            disabled={isDisabled}
          />
        </Grid>
      ))}
    </>
  );
}

export default PatientFields;
