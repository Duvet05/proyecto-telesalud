import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Table,
  TableSortLabel,
  Grid,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@mui/material";

const AttentionLogPage = () => {
  const [citas, setCitas] = useState([
    {
      id: 1,
      paciente: "Juan Pérez",
      medico: "Dr. García",
      fecha: "2023-09-29",
      hora: "15:00",
      estado: "pendiente",
    },
    // ... más citas
  ]);

  const [filtro, setFiltro] = useState("");

  const handleAtenderCita = (id) => {
    // Aquí manejamos lo que sucede al atender una cita
  };

  const handleVerDetalle = (id) => {
    // Aquí manejamos lo que sucede al ver el detalle
  };

  const [sortConfig, setSortConfig] = useState({
    key: "paciente",
    direction: "asc",
  });

  const handleSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction: direction });
  };

  const sortedCitas = React.useMemo(() => {
    let sortableCitas = [...citas];
    if (sortConfig !== null) {
      sortableCitas.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCitas;
  }, [citas, sortConfig]);

  const citasFiltradas = sortedCitas.filter((cita) => {
    return (
      cita.paciente.toLowerCase().includes(filtro.toLowerCase()) ||
      cita.medico.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Administrador de Citas Médicas
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="outlined"
            label="Filtrar citas"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={() => /* abrir formulario de nueva cita */ {}}
          >
            Crear Cita
          </Button>
        </Grid>
      </Grid>

      <Paper style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Médico</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citasFiltradas.map((cita) => (
              <TableRow key={cita.id}>
                <TableCell>{cita.paciente}</TableCell>
                <TableCell>{cita.medico}</TableCell>
                <TableCell>{cita.fecha}</TableCell>
                <TableCell>{cita.hora}</TableCell>
                <TableCell>{cita.estado}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    //color="default"
                    onClick={() => handleVerDetalle(cita.id)}
                  >
                    Detalles
                  </Button>
                  <Button
                    variant="contained"
                    //color="secondary"
                    onClick={() => handleAtenderCita(cita.id)}
                  >
                    Atender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AttentionLogPage;
