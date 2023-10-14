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
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { medicService } from "../../services/medicService";

export const DoctorTable = (props) => {
  const { doctorNameIngresado, especialidad } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");

  useEffect(() => {
    fetchDoctors();
  }, [especialidad, doctorNameIngresado]);

  const fetchDoctors = async () => {
    try {
      const data = await medicService.buscarPorNombre("");
      const doctoresFiltrados = data.filter((doctor) => {
        const nombreCompleto = `${doctor.nombres} ${doctor.apellidoPaterno} ${doctor.apellidoMaterno}`;
        const nombreCompletoSinAcentos =
          removeAccents(nombreCompleto).toLowerCase();
        const doctorNameIngresadoSinAcentos =
          removeAccents(doctorNameIngresado).toLowerCase();

        if (especialidad === "todasLasEspecialidades") {
          return (
            nombreCompletoSinAcentos.includes(doctorNameIngresadoSinAcentos) ||
            doctor.dni.includes(doctorNameIngresadoSinAcentos)
          );
        } else {
          return (
            doctor.especialidad.idEspecialidad === especialidad &&
            (nombreCompletoSinAcentos.includes(doctorNameIngresadoSinAcentos) ||
              doctor.dni.includes(doctorNameIngresadoSinAcentos))
          );
        }
      });

      setDoctors(doctoresFiltrados);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setIsLoading(false);
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
      {["Nombre Completo", "DNI", "Código Médico", "Área", "Especialidad"].map(
        (header, index) => (
          <TableCell
            key={index}
            sx={{
              fontSize: "1.1em",
              color: "#333",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            {header === "DNI" ? (
              <TableSortLabel
                active={orderBy === "dni"}
                direction={order}
                onClick={() => handleSortRequest("dni")}
              >
                {header}
              </TableSortLabel>
            ) : (
              header
            )}
          </TableCell>
        )
      )}
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
      <Link href={`/staff/perfil/${doctor.idPersona}`} passHref>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196f3",
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "#b3b3b3" },
          }}
          startIcon={<VisibilityIcon />}
        >
          Ver Perfil
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const getSortedDoctors = (doctors, orderBy, order) => {
  const comparator = (a, b) => {
    switch (orderBy) {
      case "dni":
        return parseInt(a.dni, 10) - parseInt(b.dni, 10);
      default:
        return 0;
    }
  };

  return [...doctors].sort(
    (a, b) => (order === "desc" ? -1 : 1) * comparator(a, b)
  );
};

export default DoctorTable;
