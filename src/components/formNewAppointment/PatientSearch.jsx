import React from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";

function PatientSearch({ allPatients, onSelect, onAdd }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={10} md={5}>
        <Autocomplete
          options={allPatients}
          getOptionLabel={(option) =>
            `${option.nombres} ${option.apellidoPaterno} ${option.apellidoMaterno}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="NOMBRES O DOCUMENTO DE INDENTIDAD"
              variant="outlined"
              fullWidth
            />
          )}
          onChange={(event, value) => onSelect(value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          AGREGAR
        </Button>
      </Grid>
    </Grid>
  );
}

export default PatientSearch;
