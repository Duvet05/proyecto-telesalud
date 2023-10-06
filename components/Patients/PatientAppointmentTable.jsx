import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function PatientAppointmentTable() {
  const [cargando, setCargando] = useState(false); //true
  const [patientAppointmentTable] = useState([]);

  useEffect(() => {
    /* const fetchData = async () => {
      try {
        const data = await patientService.buscarPorFiltro;
        setPatientAppointmentTable(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); */
  }, []);

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
                <TableCell>Estado</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientAppointmentTable.map((row) => (
                <TableRow
                  key={row.idPersona}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.nombreDoctor +
                      " " +
                      row.apellidoPaterno +
                      " " +
                      row.apellidoMaterno}
                  </TableCell>
                  <TableCell>{row.dni}</TableCell>
                  <TableCell>{row.fechaNacimiento}</TableCell>
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
