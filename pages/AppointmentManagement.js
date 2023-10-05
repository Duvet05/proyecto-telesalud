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
        <h2>Citas</h2>

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
          <Grid item xs={12} md={6}>
            {/* Aquí puedes colocar otros filtros en el futuro */}
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre del paciente</TableCell>
                <TableCell>Nombre del doctor</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
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
        <Link href="/NewAppointmentPage">
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
            Crear nueva cita
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default AppointmentManagement;
