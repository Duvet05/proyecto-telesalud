import React from "react";
import { TextField, Grid } from "@mui/material";

function CompanionFields() {
  return (
    <>
      {["N° documento del acompañante", "Nombre del acompañante"].map(
        (label, idx) => (
          <Grid item xs={6} key={idx}>
            <TextField label={label} variant="outlined" required fullWidth />
          </Grid>
        )
      )}
    </>
  );
}

export default CompanionFields;
