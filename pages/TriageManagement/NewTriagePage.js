import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import {
    Container,
    Grid,
    Typography,
    Paper,
    TextField,
    Button,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
  } from "@mui/material";

function NewTriagePage() {

  const [formData, setFormData] = React.useState({
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    edad: "",
    sexo: "",
    documento: "",
    motivoConsulta: "",
    temperatura: "",
    frecuenciaCardiaca: "",
    saturacionOxigeno: "",
    presionArterial: "",
    frecuenciaRespiratoria: ""
  });

  return (
    <MainLayout>
        
        <Container
        maxWidth="md"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          style={{
            padding: "30px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "30px" }}>
            Actualizar Triage
          </Typography>

          <Typography variant="h6">Información Básica</Typography>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField fullWidth label="Nombres" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Primer Apellido" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Segundo Apellido" variant="outlined" />
            </Grid>
            <Grid item xs={2}>
              <TextField fullWidth label="Edad" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Sexo" select variant="outlined">
                <MenuItem value="masculino">Masculino</MenuItem>
               <MenuItem value="femenino">Femenino</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Documento de identidad" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Peso (kg)" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Talla (m)" variant="outlined" />
            </Grid>


            <Grid item xs={12}>
              <Typography variant="h6">Motivo de consulta</Typography>
              <TextField fullWidth label="Razón específica por la que el paciente busca atención médica." variant="outlined" multiline rows={4} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Condiciones Preexistentes</Typography>
              <TextField fullWidth label="Condiciones preexistentes, medicamentos que está tomando el paciente, alergias conocidas, entre otros." variant="outlined" multiline rows={4} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Signos Vitales</Typography>
            </Grid>
            
            <Grid item xs={4}>
              <TextField fullWidth label="Temperatura (°C)" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Frecuencia Cardíaca (lpm)" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Saturación de Oxígeno (%)" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Presión arterial (mm Hg)" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Frecuencia Respiratoria (rpm)" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth label="Nivel de conciencia" select variant="outlined">
                    <MenuItem value="A">Alerta</MenuItem>
                    <MenuItem value="V">Responde a estímulos Verbales</MenuItem>
                    <MenuItem value="D">Responde a estímulos Dolorosos</MenuItem>
                    <MenuItem value="N">No responde</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Frecuencia Respiratoria (rpm)" variant="outlined" />
            </Grid>

            <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Evaluación del Dolor</InputLabel>
                    <Select
                        label="Evaluación del Dolor"
                        defaultValue={1}
                    >
                        {[...Array(10)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Button variant="contained" color="primary">Guardar</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </MainLayout>
  );
}

export default NewTriagePage;