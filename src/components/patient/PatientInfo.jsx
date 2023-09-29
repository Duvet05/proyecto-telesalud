import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f0f0f0",
}));

const Campo = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PacienteBotones = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& button": {
    marginLeft: theme.spacing(1),
  },
}));

function PatientInfo() {
  const [hasCompanion, setHasCompanion] = useState("no");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Información del paciente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="numero-documento-paciente">N° documento</label>
            <PacienteBotones>
              <TextField
                type="tel"
                id="numero-documento-paciente"
                name="numero-documento-paciente"
                variant="outlined"
                required
                fullWidth
                readOnly
              />
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <PersonAddIcon />
              </IconButton>
            </PacienteBotones>
          </Campo>
        </Grid>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="codigo-asegurado-sis">
              Código del asegurado SIS
            </label>
            <TextField
              type="text"
              id="codigo-asegurado-sis"
              name="codigo-asegurado-sis"
              variant="outlined"
              required
              fullWidth
              readOnly
            />
          </Campo>
        </Grid>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="numero-historia-clinica">N° historia clínica</label>
            <TextField
              type="tel"
              id="numero-historia-clinica"
              name="numero-historia-clinica"
              variant="outlined"
              required
              fullWidth
              readOnly
            />
          </Campo>
        </Grid>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="apellido-paterno">Apellido paterno</label>
            <TextField
              type="text"
              id="apellido-paterno"
              name="apellido-paterno"
              variant="outlined"
              required
              fullWidth
              readOnly
            />
          </Campo>
        </Grid>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="apellido-materno">Apellido materno</label>
            <TextField
              type="text"
              id="apellido-materno"
              name="apellido-materno"
              variant="outlined"
              required
              fullWidth
              readOnly
            />
          </Campo>
        </Grid>
        <Grid item xs={4}>
          <Campo>
            <label htmlFor="nombres">Nombres</label>
            <TextField
              type="text"
              id="nombres"
              name="nombres"
              variant="outlined"
              required
              fullWidth
              readOnly
            />
          </Campo>
        </Grid>
        <Grid item xs={12}>
          <Campo>
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
          </Campo>
        </Grid>
        <Grid item xs={6}>
          <Campo>
            <label htmlFor="numero-documento-acompanante">
              N° documento del acompañante
            </label>
            <TextField
              type="tel"
              id="numero-documento-acompanante"
              name="numero-documento-acompanante"
              variant="outlined"
              required
              fullWidth
              disabled={hasCompanion === "no"}
            />
          </Campo>
        </Grid>
        <Grid item xs={6}>
          <Campo>
            <label htmlFor="nombre-acompanante">Nombre del acompañante</label>
            <TextField
              type="text"
              id="nombre-acompanante"
              name="nombre-acompanante"
              variant="outlined"
              required
              fullWidth
              disabled={hasCompanion === "no"}
            />
          </Campo>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PatientInfo;
