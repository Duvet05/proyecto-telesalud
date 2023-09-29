import React from 'react';
import { makeStyles } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0',
  },
  campo: {
    marginBottom: theme.spacing(2),
  },
  pacienteBotones: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

function PatientInfo() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">Información del paciente</Typography>
      <div className={classes.campo}>
        <label htmlFor="numero-documento-paciente">N° documento</label>
        <div className={classes.pacienteBotones}>
          <TextField
            type="tel"
            id="numero-documento-paciente"
            name="numero-documento-paciente"
            variant="outlined"
            required
            fullWidth
            readOnly
          />
          <Button variant="contained" className="boton-buscar">
            Buscar
          </Button>
          <Button variant="contained" className="boton-nuevo-paciente">
            Nuevo
          </Button>
        </div>
      </div>
      <div className={classes.campo}>
        <label htmlFor="codigo-asegurado-sis">Código del asegurado SIS</label>
        <TextField
          type="text"
          id="codigo-asegurado-sis"
          name="codigo-asegurado-sis"
          variant="outlined"
          required
          fullWidth
          readOnly
        />
      </div>
      <div className={classes.campo}>
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
      </div>
      <div className={classes.campo}>
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
      </div>
      <div className={classes.campo}>
        <label htmlFor="apellido-materno">Apellido materno:</label>
        <TextField
          type="text"
          id="apellido-materno"
          name="apellido-materno"
          variant="outlined"
          required
          fullWidth
          readOnly
        />
      </div>
      <div className={classes.campo}>
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
      </div>
      <div className={classes.campo}>
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
        />
      </div>
      <div className={classes.campo}>
        <label htmlFor="nombre-acompanante">Nombre del acompañante</label>
        <TextField
          type="text"
          id="nombre-acompanante"
          name="nombre-acompanante"
          variant="outlined"
          required
          fullWidth
        />
      </div>
    </div>
  );
}

export default PatientInfo;
