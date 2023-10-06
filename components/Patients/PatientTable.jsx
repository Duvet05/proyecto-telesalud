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
import { patientService } from "../../services/patientService";
import { useDispatch, useSelector } from "react-redux";
import { setPatientState } from "@/redux/features/patientStateSlice";
import Link from "next/link";

export const PatientTable = () => {
  const [cargando, setCargando] = useState(true); //true
  const [patientTable, setPatientTable] = useState([]);
  const patientState = useSelector((state) => state.patientState);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await patientService.listar({});
        setPatientTable(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
              {patientTable.map((row) => (
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
                  {/* 
                  <TableCell>{patientState.idPaciente}</TableCell> */}
                  <TableCell>
                    {" "}
                    <Link href={`/PatientManagement/${row.idPersona}`} passHref>
                      <Button
                        variant="contained"
                        color="primary"
                        /* onClick={() =>
                        dispatch(
                          setPatientState({
                            ...patientState,
                            idPaciente: row.idPersona,
                          })
                        )
                      } */
                      >
                        Ver perfil
                      </Button>
                    </Link>
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
