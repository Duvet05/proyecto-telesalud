import { Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

function PatientForm() {
  const [patientForm, setPatientForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    fechaNacimiento: "",
    sexo: "",
    telefono: "",
    codigoSeguro: "",
    tipoSeguro: "",
    correo: "",
    direccion: "",
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid container>
          <Grid item>
            <Paper>
              <Typography>GA</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PatientForm;
