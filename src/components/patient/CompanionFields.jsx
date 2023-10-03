import React from "react";
import { TextField, Grid } from "@mui/material";

function CompanionFields() {
  return (
    <Grid container spacing={3}>
      {["N° documento del acompañante", "Nombre del acompañante"].map(
        (label, idx) => (
          <Grid item xs={6} key={idx}>
            <TextField label={label} variant="outlined" required fullWidth />
          </Grid>
        )
      )}
    </Grid>
  );
}

export default CompanionFields;
