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
import VisibilityIcon from '@mui/icons-material/Visibility';

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
              <TableCell 
                sx={{
                  fontSize: '1.1em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Nombre completo
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.1em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                DNI
              </TableCell>
              <TableCell 
                sx={{
                  fontSize: '1.1em',
                  color: '#333',
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
              >
                Fecha de Nacimiento
              </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
