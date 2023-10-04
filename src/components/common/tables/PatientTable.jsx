import { React, useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { getPatients } from "../../../services/doctorService";

export const PatientTable = () => {
  const [cargando, setCargando] = useState(true); //true
  const [patients, setPatients] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getPatients()
      .then((recibePatients) => {
        setTableData(recibePatients);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {!cargando && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre completo</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.idPersona}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.nombres +
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
                          `Ver perfil del paciente con DNI: ${patients.dni}`
                        )
                      }
                    >
                      Ver perfil
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
};
