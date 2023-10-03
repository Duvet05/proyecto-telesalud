import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import PatientFields from "./PatientFields";
import CompanionFields from "./CompanionFields";

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

function PatientInfo() {
  const [hasCompanion, setHasCompanion] = useState("no");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Información del paciente
      </Typography>
      <Grid container spacing={3}>
        <PatientFields isDisabled />
        <Grid item xs={12}>
          <Typography variant="h6">
            ¿El paciente tiene un acompañante?
          </Typography>
          <RadioGroup
            row
            value={hasCompanion}
            onChange={(e) => setHasCompanion(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        {hasCompanion === "yes" && <CompanionFields />}
      </Grid>
    </Container>
  );
}

export default PatientInfo;
