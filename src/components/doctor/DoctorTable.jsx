import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TableSortLabel,
} from "@mui/material";
import { getDoctors } from "./DoctorFunctions";

export const DoctorTable = () => {
  const [cargando, setCargando] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");

  useEffect(() => {
    getDoctors()
      .then((recibeDoctors) => {
        setTableData(recibeDoctors);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...tableData].sort((a, b) => {
    let comparison = 0;
  
    if (orderBy === "dni") {
      // Suponiendo que los DNI son números, simplemente restamos a y b para obtener el valor de comparación
      comparison = parseInt(a.dni, 10) - parseInt(b.dni, 10);
    } // Puedes agregar más condiciones para otras columnas si es necesario
  
    // Si el orden es descendente, invertimos la comparación
    return order === "desc" ? -comparison : comparison;
  });

  const handleDoctorProfile = (doctorId) => {
    // Aquí puedes redirigir al perfil del doctor usando por ejemplo react-router
    // Por ahora, solo vamos a mostrar una alerta con el ID del doctor
    alert(`Ver perfil del doctor con ID: ${doctorId}`);
  };

  return (
    <>
      {!cargando && (
        <TableContainer component={Paper}>
          <Table aria-label="doctor table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre completo</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "dni"}
                    direction={order}
                    onClick={() => handleSortRequest("dni")}
                  >
                    DNI
                  </TableSortLabel>
                </TableCell>
                <TableCell>CMP</TableCell>
                <TableCell>Área</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((doctor) => (
                <TableRow
                  key={doctor.idDoctor}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {`${doctor.nombres} ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`}
                  </TableCell>
                  <TableCell>{doctor.dni}</TableCell>
                  <TableCell>{doctor.cmp}</TableCell>
                  <TableCell>{doctor.area}</TableCell>
                  <TableCell>{doctor.especialidad.nombre}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDoctorProfile(doctor.idDoctor)}
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

export default DoctorTable;
