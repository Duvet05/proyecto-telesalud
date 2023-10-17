import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button as MUIButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TriageOrdersTable from "@/components/Triage/TriageOrdersTable"; // Asegúrate de que la ruta sea correcta
import MainLayout from "@/components/layout/MainLayout";
import WidgetStateHolder from "@/components/DATE/WidgetStateHolder";

const TriageManagement = () => {
  const [patientName, setPatientName] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchClick = () => {
    if (patientName.trim() !== "") {
      setError(null);
      // Coloca aquí la lógica para buscar órdenes de triaje (servicio o función adecuada)
      // Ejemplo ficticio:
      const triageOrders = buscarOrdenesDeTriagePorNombre(patientName);
      setOrders(triageOrders);
    }
  };

  // Simulación de búsqueda de órdenes de triaje por nombre del paciente
  const buscarOrdenesDeTriagePorNombre = (nombre) => {
    // Aquí deberías implementar la búsqueda real en tu sistema
    // Esto es solo un ejemplo ficticio:
    return [
      {
        id: 1,
        patientName: "Paciente 1",
        doctorName: "Doctor A",
        fecha: "2023-01-01",
        estado: "Pendiente",
      },
      {
        id: 2,
        patientName: "Paciente 2",
        doctorName: "Doctor B",
        fecha: "2023-02-01",
        estado: "Completo",
      },
      // Más órdenes aquí...
    ];
  };

  return (
    <MainLayout>
      <Container maxWidth={false} style={{ height: "100vh" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#000",
            gap: "0.1mm",
            marginBottom: "5px",
            marginTop: "-50px",
          }}
        >
          Gestión de TriajeS
        </Typography>
        <WidgetStateHolder providerId={1} />
        <Paper sx={{ my: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                variant="outlined"
                label="Buscar por Nombre..."
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MUIButton
                variant="contained"
                sx={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#b3b3b3",
                  },
                  marginLeft: "0",
                }}
                startIcon={<SearchIcon />}
                fullWidth
                onClick={handleSearchClick}
              >
                Buscar
              </MUIButton>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <TriageOrdersTable orders={orders} />
      </Container>
    </MainLayout>
  );
};

export default TriageManagement;
