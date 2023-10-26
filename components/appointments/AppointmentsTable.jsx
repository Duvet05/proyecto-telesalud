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
    const fetchData = async () => {
      try {
        const data = await appointmentService.listar();
        const mappedData = mapDataToAppointments(data);
        setAppointments(mappedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al obtener las citas:", err);
        setError("Hubo un problema al cargar las citas."); // Error seteado
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapDataToAppointments = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((appointment) => ({
      id: appointment.idCita,
      codigoCita: appointment.codigoCita,
      patientName: `${appointment.paciente.nombres} ${appointment.paciente.apellidoPaterno} ${appointment.paciente.apellidoMaterno}`,
      doctorName: `${appointment.medico.nombres} ${appointment.medico.apellidoPaterno} ${appointment.medico.apellidoMaterno}`,
      speciality: appointment.medico.especialidad.nombre,
      date: appointment.fechaCita,
      time: appointment.horaCita,
      status: getStatus(appointment.estado),
    }));
  };

  const getStatus = (estado) => {
    switch (estado) {
      case 1:
        return "Atendida";
      case 2:
        return "En Consultorio";
      case 3:
        return "Cancelada";
      case 4:
        return "Pendiente";
      default:
        return "Desconocido";
    }
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
      let keyA = a[sortConfig.key];
      let keyB = b[sortConfig.key];

      // String sort
      if (
        typeof keyA === "string" &&
        sortConfig.key !== "date" &&
        sortConfig.key !== "time"
      ) {
        keyA = keyA.toLowerCase();
        keyB = keyB.toLowerCase();
      }

      // Date and Time sort
      if (sortConfig.key === "date") {
        keyA = new Date(`${a.date} ${a.time}`);
        keyB = new Date(`${b.date} ${b.time}`);
      }

      // Status sort (optional: if you have a specific order for states, adjust accordingly)
      if (sortConfig.key === "status") {
        const statusOrder = {
          Atendida: 1,
          "En Consultorio": 2,
          Cancelada: 3,
          Pendiente: 4,
          Desconocido: 5,
        };
        keyA = statusOrder[keyA];
        keyB = statusOrder[keyB];
      }

      // Comparison logic
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
    { key: "codigoCita", label: "Codigo Cita" },
    { key: "patientName", label: "Paciente" },
    { key: "doctorName", label: "Doctor" },
    { key: "speciality", label: "Especialidad" },
    { key: "date", label: "Fecha y Hora" }, // changed "date and time" to "date"
    { key: "status", label: "Estado" },
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
              <TableCell>{appointment.codigoCita}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.speciality}</TableCell>
              <TableCell>
                {appointment.date} - {appointment.time}
              </TableCell>
              <TableCell>{appointment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
