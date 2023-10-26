import React from "react";
import { CircularProgress, Button, TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { patientService } from "@/services/patientService";
import BaseTable from "../common/BaseTable";

// Function to fetch patients
const fetchPatients = async (filtro) => {
  try {
    const data = await patientService.buscarPorFiltro(filtro);
    data.forEach((element) => {
      element["id"] = element.idPersona;
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Hubo un error al cargar los datos. Inténtelo de nuevo.");
  }
};

const PatientRowComponent = ({ data }) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell>{`${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`}</TableCell>
    <TableCell>{data.dni}</TableCell>
    <TableCell>{data.fechaNacimiento}</TableCell>
    <TableCell>
      <Link href={`/PatientManagement/${data.idPersona}`} passHref>
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

const PatientTable = ({ filtro }) => {
  const columns = [
    { id: "name", label: "Nombre completo", sortable: false },
    { id: "dni", label: "DNI", sortable: true },
    { id: "birthdate", label: "Fecha de Nacimiento", sortable: false },
    { id: "actions", label: "Acciones", sortable: false },
  ];

  return (
    <>
      <BaseTable
        fetchData={() => fetchPatients(filtro)}
        columns={columns}
        RowComponent={PatientRowComponent}
        extraProps={{ filtro }}
      />
    </>
  );
};

export default PatientTable;
