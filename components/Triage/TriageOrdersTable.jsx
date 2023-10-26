import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
} from "@mui/material";
import Link from "next/link";
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
                active={orderBy === "dni"}
                direction={order}
                onClick={() => handleSortRequest("dni")}
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
            <TableRow key={order.id}>
              <TableCell>{order.fechaTriaje}</TableCell>
              <TableCell>{order.paciente.apellidoPaterno + " " + order.paciente.apellidoMaterno + ", " + order.paciente.nombres}</TableCell>
              <TableCell>{order.dni}</TableCell>
              <TableCell>{order.estado}</TableCell>
              <TableCell>{order.urgencia}</TableCell>
              <TableCell>
                <Link href={`/TriageManagement/${order.idTriaje}`} passHref>
                  <button>
                    Actualizar
                  </button>
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
