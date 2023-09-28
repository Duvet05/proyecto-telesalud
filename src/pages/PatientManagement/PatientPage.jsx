import { React, useState, useEffect } from "react";
import { PatientTable } from "./PatientTable";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PatientPage = (props) => {
  const [value, setValue] = useState(new Date());
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
        }}
      >
        Pacientes
      </Typography>

      <Paper
        sx={{
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            paddingTop: "10px",
            paddingBottom: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Grid item xs={6}>
            <TextField label="Buscar por nombre o dni" fullWidth></TextField>
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              label="Ultima visita"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" size="large">
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <PatientTable className="tablaPacientes"></PatientTable>
    </div>
  );
};

export default PatientPage;
