import React from "react";
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
import EditIcon from '@mui/icons-material/Edit';

function getEstadoTexto(estado) {
  let estadoTexto = "";

  switch (estado) {
      case 1:
          estadoTexto = "Atendida";
          break;
      case 2:
          estadoTexto = "En Consultorio";
          break;
      case 3:
          estadoTexto = "Cancelada";
          break;
      case 4:
          estadoTexto = "Pendiente";
          break;
      default:
          estadoTexto = "Desconocido";
  }

  return estadoTexto;
}


const TriageOrdersTable = ({ orders, order, orderBy, handleSortRequest }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="triage orders table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              <TableSortLabel
                active={orderBy === "fecha"}
                direction={order}
                onClick={() => handleSortRequest("fecha")}
              >
                Fecha
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              <TableSortLabel
                active={orderBy === "nombreCompleto"}
                direction={order}
                onClick={() => handleSortRequest("nombreCompleto")}
              >
                Nombre completo
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              DNI
            </TableCell>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              Estado
            </TableCell>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              Urgencia
            </TableCell>
            <TableCell
              sx={{ fontSize: '1.1em', color: '#333', paddingBottom: '10px', paddingTop: '10px' }}
            >
              Opción
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.idTriaje}>
              <TableCell>{order.fechaTriaje}</TableCell>
              <TableCell>{order.paciente.apellidoPaterno + " " + order.paciente.apellidoMaterno + ", " + order.paciente.nombres}</TableCell>
              <TableCell>{order.paciente.dni}</TableCell>  
              <TableCell>{getEstadoTexto(order.estado)}</TableCell>       
              <TableCell>{order.prioridad}</TableCell>    
              <TableCell>
                <Link href={`/TriageManagement/${order.idTriaje}`} passHref>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#2196f3",
                    color: "#ffffff",
                    fontSize: "1.0em",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#b3b3b3",
                    },
                    "& .MuiButton-startIcon": {
                      margin: 0,
                      marginRight: "4px",
                    },
                  }}
                  startIcon={<EditIcon  />}
                >
                  
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TriageOrdersTable;
