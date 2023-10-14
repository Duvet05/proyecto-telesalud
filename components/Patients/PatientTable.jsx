import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { patientService } from "@/services/patientService";
import { setPatients, setLoading } from "@/redux/features/patient/patientSlice";
import BaseTable from "../common/BaseTable";
import { TableRow, TableCell } from "@mui/material";

export const PatientTable = () => {
  const dispatch = useDispatch();
  const { loading, patients } = useSelector((state) => state.patient);

  const fetchData = async () => {
    try {
      const data = await patientService.listar({});
      dispatch(setPatients(data));
      dispatch(setLoading(false));
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Hubo un error al cargar los datos. Inténtelo de nuevo.");
    }
  };

  const columns = [
    { id: "name", label: "Nombre completo" },
    { id: "dni", label: "DNI" },
    { id: "birthdate", label: "Fecha de Nacimiento" },
    { id: "actions", label: "Acciones" },
  ];

  return (
    <>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2em" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <BaseTable
          fetchData={fetchData}
          columns={columns}
          RowComponent={PatientRow}
        />
      )}
    </>
  );
};

const PatientRow = ({ data }) => {
  const {
    idPersona,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    dni,
    fechaNacimiento,
  } = data;

  return (
    <TableRow key={idPersona}>
      <TableCell>{`${nombres} ${apellidoPaterno} ${apellidoMaterno}`}</TableCell>
      <TableCell>{dni}</TableCell>
      <TableCell>{fechaNacimiento}</TableCell>
      <TableCell>
        <Link href={`/PatientManagement/${idPersona}`} passHref>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
          >
            Ver Perfil
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default PatientTable;
