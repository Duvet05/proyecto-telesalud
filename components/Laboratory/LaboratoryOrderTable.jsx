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

const LaboratoryOrdersTable = ({
  orders,
  order,
  orderBy,
  handleSortRequest,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="laboratory orders table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "id"}
                direction={order}
                onClick={() => handleSortRequest("id")}
              >
                Id
              </TableSortLabel>
            </TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Doctor que Mandó la Orden</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "fecha"}
                direction={order}
                onClick={() => handleSortRequest("fecha")}
              >
                Fecha de Orden
              </TableSortLabel>
            </TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
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

export default LaboratoryOrdersTable;
