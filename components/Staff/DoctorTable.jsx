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
import { medicService } from "../../services/medicService";
import Link from "next/link"; // Importar Link de Next.js
import VisibilityIcon from '@mui/icons-material/Visibility';

export const DoctorTable = (props) => {
  const { doctorNameIngresado, especialidad } = props;
  console.log(`hola ${especialidad}`);
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");
  useEffect(() => {
    fetchDoctors();
  }, [especialidad, doctorNameIngresado]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const fetchDoctors = async () => {
    try {
      const data = await medicService.buscarPorNombre("");
      const doctoresFiltrados = data.filter((doctor) => {
        const nombreCompleto = `${doctor.nombres} ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`;
        const nombreCompletoSinAcentos = removeAccents(nombreCompleto).toLowerCase();
        const doctorNameIngresadoSinAcentos = removeAccents(doctorNameIngresado).toLowerCase();

        if (especialidad === "todasLasEspecialidades") {
          return nombreCompletoSinAcentos.includes(doctorNameIngresadoSinAcentos) 
          || doctor.dni.includes(doctorNameIngresadoSinAcentos);
        } else {
          return (
            doctor.especialidad.idEspecialidad === especialidad && (
            nombreCompletoSinAcentos.includes(doctorNameIngresadoSinAcentos) || doctor.dni.includes(doctorNameIngresadoSinAcentos))
          );
        }
      });

      setDoctors(doctoresFiltrados);
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
      <TableCell 
        sx={{
          fontSize: '1.1em',
          color: '#333',
          paddingBottom: '10px',
          paddingTop: '10px'
        }}
      >
        Nombre Completo
      </TableCell>
      <TableCell
        sx={{
          fontSize: '1.1em',
          color: '#333',
          paddingBottom: '10px',
          paddingTop: '10px'
        }}      
      >
        <TableSortLabel
          active={orderBy === "dni"}
          direction={order}
          onClick={() => handleSortRequest("dni")}
        >
          DNI
        </TableSortLabel>
      </TableCell>
      <TableCell
        sx={{
          fontSize: '1.1em',
          color: '#333',
          paddingBottom: '10px',
          paddingTop: '10px'
        }}
      >
        Código Médico
      </TableCell>
      <TableCell
        sx={{
          fontSize: '1.1em',
          color: '#333',
          paddingBottom: '10px',
          paddingTop: '10px'
        }}
      >
        Área
      </TableCell>
      <TableCell
        sx={{
          fontSize: '1.1em',
          color: '#333',
          paddingBottom: '10px',
          paddingTop: '10px'
        }}
      >
        Especialidad
      </TableCell>
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
      {`${doctor.apellidoPaterno.toUpperCase()} ${doctor.apellidoMaterno.toUpperCase()}, ${doctor.nombres.toUpperCase()}`}
    </TableCell>
    <TableCell>{doctor.dni}</TableCell>
    <TableCell>{doctor.cmp}</TableCell>
    <TableCell>{doctor.area.toUpperCase()}</TableCell>
    <TableCell>{doctor.especialidad.nombre.toUpperCase()}</TableCell>
    <TableCell>
      {/* Enlace dinámico al perfil del médico */}
      <Link href={`/staff/perfil/${doctor.idPersona}`} passHref>
        {" "}
        {/* Asegúrate de que 'idPersona' es el identificador correcto */}
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
          startIcon={<VisibilityIcon />} // Ícono del ojito al lado izquierdo
        >
          Ver Perfil
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
