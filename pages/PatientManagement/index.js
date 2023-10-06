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
import SearchIcon from '@mui/icons-material/Search';

const PatientManagement = () => {
  return (
    <MainLayout>
      <Typography
        variant="h4"
        sx={{
          color: "#000",
          gap: "0.1mm",
          marginBottom: "30px",
          marginTop: "-50px"
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
          <Grid item xs={4}>
            <TextField label="Nombre o DNI" 
              fullWidth 
              variant="outlined"
              sx={{
                marginRight: '0', // Elimina cualquier margen a la derecha
            }}></TextField>
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
              <Button 
                  sx={{
                      backgroundColor: '#2196f3',  // Color del botón
                      color: '#ffffff',            // Hacer el texto blanco
                      fontSize: '1.0em',           // Tamaño del texto
                      textTransform: 'none',       // Sin transformación del texto (sin mayúsculas)
                      minWidth: '100px',           // Ancho mínimo del botón
                      '&:hover': {
                          backgroundColor: '#b3b3b3', // Color al pasar el cursor por encima
                      },     
                      '& .MuiButton-startIcon': {
                          margin: 0,
                          marginRight: '4px',
                      }
                  }}
                  startIcon={<SearchIcon />} // Ícono de búsqueda al lado izquierdo
              >
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
