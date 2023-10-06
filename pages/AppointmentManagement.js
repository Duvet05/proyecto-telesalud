import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import Link from "next/link"; // Importa el componente Link de Next.js
import SearchIcon from "@mui/icons-material/Search";
import MainLayout from "@/components/layout/MainLayout";
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
function AppointmentManagement(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#000",
          gap: "0.1mm",
          marginBottom: "15px",
          marginTop: "-70px"
        }}
      >
        Citas
      </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nombre, email, especialidad..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            <Link href="/NewAppointmentPage">
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: '#2196f3', // Este es un color gris claro, puedes ajustarlo
                  color: 'white', 
                  textTransform: 'none',    // Esto quitará las mayúsculas
                  '&:hover': {
                    backgroundColor: '#b3b3b3', // Un gris un poco más oscuro cuando pasas el cursor por encima
                  },
                }}
                startIcon={<AddIcon />} // Ícono del ojito al lado izquierdo
              >
                Nueva cita
              </Button>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>

          <TableHead>
            <TableRow>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Paciente
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Doctor
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Especialidad
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Especialidad
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Fecha
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Hora
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Estado
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.0em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.speciality}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{/* Opciones para cada cita */}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Utiliza el componente Link de Next.js para enlazar a la página "citas/new" */}

      </div>
    </MainLayout>
  );
}

export default AppointmentManagement;
