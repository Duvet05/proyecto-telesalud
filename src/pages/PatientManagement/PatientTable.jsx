import { React, useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { getPatients } from "./PatientFunctions";

export const PatientTable = () => {
  const [cargando, setCargando] = useState(true); //true

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
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

/* const tableData2 = [
  {
    nombre_completo: "Hastie Zouch",
    direccion: "0031 Mayer Court",
    email: "hzouch0@squidoo.com",
    gender: "Male",
  },
  {
    nombre_completo: "Roddie Beddis",
    direccion: "409 Calypso Circle",
    email: "rbeddis1@wired.com",
    gender: "Genderfluid",
  },
  {
    nombre_completo: "Mort Jurick",
    direccion: "7811 Arapahoe Court",
    email: "mjurick2@army.mil",
    gender: "Male",
  },
  {
    nombre_completo: "Pearl Danielovitch",
    direccion: "7017 Butternut Park",
    email: "pdanielovitch3@miibeian.gov.cn",
    gender: "Female",
  },
  {
    nombre_completo: "Marian Phythean",
    direccion: "1 Butternut Avenue",
    email: "mphythean4@apple.com",
    gender: "Female",
  },
  {
    nombre_completo: "Ceciley Boothroyd",
    direccion: "61 Hanson Terrace",
    email: "cboothroyd5@flavors.me",
    gender: "Non-binary",
  },
  {
    nombre_completo: "Marleah Chaudron",
    direccion: "4 Southridge Alley",
    email: "mchaudron6@pbs.org",
    gender: "Female",
  },
  {
    nombre_completo: "Riordan Measen",
    direccion: "5611 Jackson Park",
    email: "rmeasen7@sakura.ne.jp",
    gender: "Male",
  },
  {
    nombre_completo: "Jacklyn Dodshun",
    direccion: "97751 Leroy Circle",
    email: "jdodshun8@bizjournals.com",
    gender: "Female",
  },
  {
    nombre_completo: "Becky Limpertz",
    direccion: "3816 Lakewood Circle",
    email: "blimpertz9@oakley.com",
    gender: "Agender",
  },
];
 */
