import React from "react";
import { Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function CompanionQuestion({ value = "yes", onChange }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        ¿El paciente es responsable legal?
      </Typography>
      <RadioGroup row value={value} onChange={onChange}>
        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </>
  );
}

export default CompanionQuestion;
