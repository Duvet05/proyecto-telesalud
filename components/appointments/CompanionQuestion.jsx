import React from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";

function CompanionQuestion({ value = "yes", onChange }) {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        ¿El paciente es responsable legal?
      </Typography>
      <RadioGroup row value={value} onChange={onChange}>
        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </Grid>
  );
}

export default CompanionQuestion;
