import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const tableStyles = {
  fontSize: "1.0em",
  color: "#333",
  paddingBottom: "10px",
  paddingTop: "10px",
};
const AppointmentsTable = ({ appointments }) => (
  <TableContainer component={Paper} style={{ marginTop: 20 }}>
    <Table>
      <TableHead>
        <TableRow>
          {[
            "Paciente",
            "Doctor",
            "Especialidad",
            "Fecha",
            "Hora",
            "Estado",
            "Opciones",
          ].map((header) => (
            <TableCell key={header} sx={tableStyles}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.map((appointment) => (
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

export default AppointmentsTable;
