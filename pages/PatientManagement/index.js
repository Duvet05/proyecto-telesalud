import React from "react";
import {
  Grid,
  Typography,
  Button,
  Input,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  TextField,
} from "@mui/material";
import MainLayout from "@/components/layout/MainLayout"; /* 
import PatientForm from "@/components/Patients/PatientForm"; */
import { PatientTable } from "@/components/Patients/PatientTable";

const PatientManagement = () => {
  return (
    <MainLayout>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#2196F3",
          gap: "0.1mm",
          marginBottom: "50px",
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
      {/* <PatientForm /> */}
    </MainLayout>
  );
};

export default PatientManagement;
