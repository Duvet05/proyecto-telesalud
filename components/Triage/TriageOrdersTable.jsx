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

const TriageOrdersTable = ({ orders, order, orderBy, handleSortRequest }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="triage orders table">
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
              Paciente
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}      
            >
              <TableSortLabel
                active={orderBy === "dni"}
                direction={order}
                onClick={() => handleSortRequest("dni")}
              >
                Médico prescriptor
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
            <TableSortLabel
                active={orderBy === "fecha"}
                direction={order}
                onClick={() => handleSortRequest("fecha")}
              ></TableSortLabel>
              Fecha
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              Estado
            </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.patientName}</TableCell>
              <TableCell>{order.doctorName}</TableCell>
              <TableCell>{order.fecha}</TableCell>
              <TableCell>{order.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TriageOrdersTable;
