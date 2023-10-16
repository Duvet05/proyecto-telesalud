import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { appointmentService } from "@/services/appointmentService";

const tableStyles = {
  fontSize: "1.0em",
  color: "#333",
  paddingBottom: "10px",
  paddingTop: "10px",
};

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    appointmentService
      .listar()
      .then((data) => {
        const mappedData = mapDataToAppointments(data);
        setAppointments(mappedData);
        setIsLoading(false); // Datos cargados
      })
      .catch((err) => {
        console.error("Error al obtener las citas:", err);
        setError("Hubo un problema al cargar las citas."); // Error seteado
        setIsLoading(false);
      });
  }, []);

  const mapDataToAppointments = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((appointment) => ({
      id: appointment.idCita,
      patientName: `${appointment.paciente.nombres} ${appointment.paciente.apellidoPaterno} ${appointment.paciente.apellidoMaterno}`,
      doctorName: `${appointment.medico.nombres} ${appointment.medico.apellidoPaterno} ${appointment.medico.apellidoMaterno}`,
      speciality: appointment.medico.especialidad.nombre,
      date: appointment.fechaCita,
      time: appointment.horaCita,
      status: appointment.estado === 1 ? "Activo" : "Inactivo",
    }));
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAppointments = appointments.sort((a, b) => {
    if (sortConfig.key !== "") {
      const keyA = a[sortConfig.key].toLowerCase();
      const keyB = b[sortConfig.key].toLowerCase();
      if (keyA < keyB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (keyA > keyB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const headers = [
    { key: "patientName", label: "Paciente" },
    { key: "doctorName", label: "Doctor" },
    { key: "speciality", label: "Especialidad" },
    { key: "date", label: "Fecha" },
    { key: "time", label: "Hora" },
    { key: "status", label: "Estado" },
    // ... Otros encabezados
  ];

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.key} sx={tableStyles}>
                <TableSortLabel
                  active={sortConfig.key === header.key}
                  direction={
                    sortConfig.key === header.key ? sortConfig.direction : "asc"
                  }
                  onClick={() => requestSort(header.key)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAppointments.map((appointment) => (
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
  );
};

export default AppointmentsTable;
