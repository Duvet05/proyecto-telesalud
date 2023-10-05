import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import assets from "../../public/assets";

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
      <Grid
        container
        spacing={10}
        justifyContent="space-around"
        alignItems="stretch"
      >
        {/* Foto y datos pequeños */}
        <Grid item md={1}></Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Paper>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} pt={3} pb={1.5}>
                <Avatar
                  src="../assets/images/fotoPrueba.jpg"
                  sx={{ width: 150, height: 150 }}
                ></Avatar>
              </Grid>

              <Grid item xs={12}>
                <Typography fontWeight="bold" textTransform={"uppercase"}>
                  Nombre del paciente
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography pb={3}>DNI</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={1}></Grid>
        {/* Informacion a fondo */}

        <Grid item xs={12} sm={12} md={3}>
          <Paper sx={{ padding: "20px" }}>
            <Grid container spacing={3}>
              {/* Columna izquierda */}

              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Genero</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Direccion</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Tipo de seguro</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Estado</Typography>
              </Grid>

              {/* Columna derecha */}

              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Fecha de nacimiento</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Nº de seguro</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Correo electronico</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Telefono</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </>
  );
}

export default PatientForm;
