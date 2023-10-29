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
  Button,
} from "@mui/material";
import Link from "next/link";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const LaboratoryOrdersTable = ({
  orders,
  order,
  orderBy,
  handleSortRequest,
}) => {
  //useStates

  return (
    <TableContainer component={Paper}>
      <Table aria-label="laboratory orders table">
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
              N° de atención
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              {/* <TableSortLabel
                active={orderBy === "fecha"}
                direction={order}
                onClick={() => handleSortRequest("fecha")}
              >
                Fecha de orden
              </TableSortLabel> */}
              Fecha de orden
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              DNI Paciente
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              Médico prescriptor
            </TableCell>


            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              Tipo de examen
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
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              { }
            </TableCell>
            <TableCell
              sx={{
                fontSize: '1.1em',
                color: '#333',
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              { }
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.idOrdenLaboratorio}</TableCell>
              <TableCell>{order.fechaOrden}</TableCell>
              <TableCell>{order.citaMedica.paciente.dni}</TableCell>
              <TableCell>{order.citaMedica.medico.apellidoPaterno + " " + order.citaMedica.medico.apellidoMaterno
                + ", " + order.citaMedica.medico.nombres}
              </TableCell>
              <TableCell>{order.tipoOrden}</TableCell>
              <TableCell>
                {(() => {
                  switch (order.estado) {
                    case 1:
                      return 'Atendida';
                    case 2:
                      return 'En Consultorio';
                    case 3:
                      return 'Cancelada';
                    case 4:
                      return 'Pendiente';
                    default:
                      return 'Estado Desconocido';
                  }
                })()}
              </TableCell>

              <TableCell>
                <Button variant="contained" color="secondary" startIcon={<VisibilityIcon />} size="small">
                  Visualizar  {/* Visualizar solo si el estado está en atendido */}
                </Button>
              </TableCell>
              <TableCell>
                <Link
                  href={`/LaboratoryManagement/${order.idOrdenLaboratorio}`}
                  passHref
                  onClick={() => {
                    router.push({
                      pathname: `/LaboratoryManagement/${order.idOrdenLaboratorio}`,
                      query: { order:  "Hola"}, //JSON.stringify(order) Aquí pasamos el objeto `order` como un parámetro en la URL
                    });
                  }}
                  >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventAvailableIcon />}
                    size="small"
                    disabled={(() => {
                      switch (order.estado) {
                        case 1:
                        case 3:
                          return true;
                        default:
                          return false;
                      }
                    })()}>
                    Atender
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

export default LaboratoryOrdersTable;
