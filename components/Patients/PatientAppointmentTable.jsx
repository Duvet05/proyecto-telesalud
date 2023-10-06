import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function PatientAppointmentTable({ appointmentList, cargando }) {
  return (
    <>
      {!cargando && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre del doctor </TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentList.map((row) => (
                <TableRow
                  key={row.idPersona}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.medico.nombres +
                      " " +
                      row.medico.apellidoPaterno +
                      " " +
                      row.medico.apellidoMaterno}
                  </TableCell>
                  <TableCell>{row.medico.especialidad.nombre}</TableCell>
                  <TableCell>{row.fechaCita}</TableCell>
                  <TableCell>{row.horaCita}</TableCell>

                  <TableCell>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        alert(
                          `Ver informacion del paciente con DNI: ${row.dni} de la cita con codigo: ${row.codigoCita}`
                        )
                      }
                    >
                      Ver cita
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
