import React from "react";
import { TextField, Grid } from "@mui/material";

function PatientFields({ isDisabled, patientData }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TextField
          label="DOCUMENTO DE IDENTIDAD"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.dni : ""}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="N° DE SEGURO"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.codigoSeguro : ""}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="NOMBRES"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.nombres : ""}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="PRIMER APELLIDO"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.apellidoPaterno : ""}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="SEGUNDO APELLIDO"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.apellidoMaterno : ""}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="FECHA DE NACIMIENTO"
          variant="outlined"
          required
          fullWidth
          disabled={isDisabled}
          value={patientData ? patientData.fechaNacimiento : ""}
        />
      </Grid>
    </Grid>
  );
}

export default PatientFields;
