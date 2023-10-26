import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { medicService } from "../../services/medicService";
import BaseTable from "../common/BaseTable";

// Function to fetch doctors
const fetchDoctors = async ({ doctorNameIngresado, especialidad }) => {
  const data = await medicService.buscarPorNombre("");
  data.forEach((element) => {
    element["id"] = element.idPersona;
  });
  return data.filter((doctor) => {
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
};

const DoctorRowComponent = ({ data }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell>
      {`${data.apellidoPaterno.toUpperCase()} ${data.apellidoMaterno.toUpperCase()}, ${data.nombres.toUpperCase()}`}
    </TableCell>
    <TableCell>{data.dni}</TableCell>
    <TableCell>{data.cmp}</TableCell>
    <TableCell>{data.area.toUpperCase()}</TableCell>
    <TableCell>{data.especialidad.nombre.toUpperCase()}</TableCell>
    <TableCell>
      <Link href={`/StaffManagement/${data.idPersona}`} passHref>
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

const DoctorTable = (props) => {
  const columns = [
    { id: "nombreCompleto", label: "Nombre Completo", sortable: false },
    { id: "dni", label: "DNI", sortable: true },
    { id: "codigoMedico", label: "Código Médico", sortable: false },
    { id: "area", label: "Área", sortable: false },
    { id: "especialidad", label: "Especialidad", sortable: false },
  ];

  return (
    <>
      <BaseTable
        fetchData={fetchDoctors}
        columns={columns}
        RowComponent={DoctorRowComponent}
        extraProps={props}
      />
    </>
  );
};

const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default DoctorTable;
