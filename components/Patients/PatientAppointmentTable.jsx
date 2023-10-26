import React from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export default function PatientAppointmentTable({ appointmentList, cargando }) {
  if (cargando) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (appointmentList.length === 0) {
    return <p>No hay citas disponibles.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "30%" }}
              sx={{
                fontSize: "1.1em",
                color: "#333",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Nombre del Doctor
            </TableCell>
            <TableCell
              style={{ width: "20%" }}
              sx={{
                fontSize: "1.1em",
                color: "#333",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Especialidad
            </TableCell>
            <TableCell
              style={{ width: "20%" }}
              sx={{
                fontSize: "1.1em",
                color: "#333",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Fecha
            </TableCell>
            <TableCell
              style={{ width: "10%" }}
              sx={{
                fontSize: "1.1em",
                color: "#333",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Hora
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentList.map((row) => (
            <TableRow
              key={row.idCita}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {row.medico.nombres +
                  " " +
                  row.medico.apellidoPaterno +
                  " " +
                  row.medico.apellidoMaterno}
              </TableCell>
              <TableCell>{row.medico.especialidad.nombre}</TableCell>
              <TableCell>{row.fechaCita}</TableCell>
              <TableCell>{row.horaCita}</TableCell>

              <TableCell>
                {" "}
                <Button
                  variant="contained"
                  onClick={() =>
                    alert(
                      `Ver informacion del paciente con DNI: ${row.dni} de la cita con codigo: ${row.codigoCita}`
                    )
                  }
                  sx={{
                    backgroundColor: "#2196f3",
                    color: "#ffffff", // Texto blanco
                    fontSize: "1.0em", // Tamaño del texto
                    textTransform: "none", // Sin transformación de texto (mayúsculas)
                    minWidth: "80px", // Ancho mínimo
                    width: "auto", // Ancho fijo
                    "&:hover": {
                      backgroundColor: "#b3b3b3", // Color de fondo al pasar el cursor
                    },
                    "& .MuiButton-startIcon": {
                      margin: 0,
                      marginRight: "4px", // Margen derecho del ícono
                    },
                  }}
                  startIcon={<DescriptionIcon />} // Ícono de documento al inicio del botón
                >
                  Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
