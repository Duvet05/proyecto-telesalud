import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button as MUIButton,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { laboratoryService } from "@/services/laboratoryService"; // Asegúrate de que la ruta sea correcta
import LaboratoryOrderTable from "@/components/Laboratory/LaboratoryOrderTable";
import MainLayout from "@/components/layout/MainLayout";

const LaboratoryManagement = () => {
  const [patientName, setPatientName] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchClick = () => {
    if (patientName.trim() !== "") {
      setLoading(true);
      setError(null);
      laboratoryService
        .searchOrders(patientName)
        .then((result) => {
          setOrders(result);
        })
        .catch((error) => {
          console.error(
            "Error al buscar órdenes  de laboratorio por nombre del paciente",
            error
          );
          setError(
            "Error al buscar órdenes de laboratorio por nombre del paciente"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
          Gestión de Laboratorio
        </Typography>

        <Paper sx={{ my: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Buscar por nombre del paciente"
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

        <LaboratoryOrderTable orders={orders} />
      </Container>
    </MainLayout>
  );
};

export default LaboratoryManagement;
