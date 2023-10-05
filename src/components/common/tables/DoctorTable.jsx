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
import { medicService } from "../../../services/medicService";
import { Link } from "react-router-dom";
export const DoctorTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await medicService.listar();
      setDoctors(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setIsLoading(false);
      // Considerar mostrar un mensaje de error al usuario aquí
    }
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedDoctors = getSortedDoctors(doctors, orderBy, order);

  return (
    !isLoading && (
      <TableContainer component={Paper}>
        <Table aria-label="doctor table">
          <DoctorTableHead
            handleSortRequest={handleSortRequest}
            order={order}
            orderBy={orderBy}
          />
          <DoctorTableBody doctors={sortedDoctors} />
        </Table>
      </TableContainer>
    )
  );
};

const DoctorTableHead = ({ handleSortRequest, order, orderBy }) => (
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
      <TableCell>Codigo Medico</TableCell>
      <TableCell>Área</TableCell>
      <TableCell>Especialidad</TableCell>
      <TableCell>Opciones</TableCell>
    </TableRow>
  </TableHead>
);

const DoctorTableBody = ({ doctors }) => (
  <TableBody>
    {doctors.map((doctor) => (
      <DoctorRow key={doctor.idDoctor} doctor={doctor} />
    ))}
  </TableBody>
);

const DoctorRow = ({ doctor }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell>
      {`${doctor.nombres} ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`}
    </TableCell>
    <TableCell>{doctor.dni}</TableCell>
    <TableCell>{doctor.cmp}</TableCell>
    <TableCell>{doctor.area}</TableCell>
    <TableCell>{doctor.especialidad.nombre}</TableCell>
    <TableCell>
      {/* Enlace dinámico al perfil del médico */}
      <Link to={`/medicos/${doctor.idPersona}`}>
        <Button variant="contained" color="primary">
          Ver perfil
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

const getSortedDoctors = (doctors, orderBy, order) => {
  const comparator = (a, b) => {
    switch (orderBy) {
      case "dni":
        return parseInt(a.dni, 10) - parseInt(b.dni, 10);
      // Add more cases as needed
      default:
        return 0;
    }
  };
  return [...doctors].sort(
    (a, b) => (order === "desc" ? -1 : 1) * comparator(a, b)
  );
};

export default DoctorTable;
