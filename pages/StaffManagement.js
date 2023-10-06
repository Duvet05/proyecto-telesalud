import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button as MUIButton,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { medicService } from "../services/medicService"; // Asegúrate de que la ruta sea correcta
import DoctorTable from "@/components/Staff/DoctorTable";
import MainLayout from "@/components/layout/MainLayout";

const StaffManagement = () => {
  const [doctorName, setDoctorName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("todasLasEspecialidades");
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar la lista de especialidades una vez al inicio
    medicService
      .listarEspecialidades()
      .then((data) => setSpecialties(data))
      .catch((error) => {
        console.error("Error al obtener la lista de especialidades:", error);
        setError("Error al obtener la lista de especialidades");
      });
  }, []);

  const handleSearchClick = () => {
    // if (doctorName.trim() !== "") {
    //   setLoading(true);
    //   setError(null);
    //   medicService
    //     .buscarPorNombre(doctorName)
    //     .then((result) => {
    //       // Luego de obtener los resultados, puedes actualizar el estado
    //       setDoctorName(doctorName);
    //       setSelectedSpecialty(selectedSpecialty);
    //     })
    //     .catch((error) => {
    //       console.error("Error al buscar doctores por nombre", error);
    //       setError("Error al buscar doctores por nombre");
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
  };

  return (
    <MainLayout>
      <Container maxWidth={false} style={{ height: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#000",
          gap: "0.1mm",
          marginBottom: "5px",
          marginTop: "-50px"
        }}
      >
        Médicos
      </Typography>

        <Paper sx={{ my: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="Nombre o DNI" 
                fullWidth 
                variant="outlined"
                value={doctorName}
                onChange={(event) => setDoctorName(event.target.value)}
                sx={{
                  marginRight: '0', // Elimina cualquier margen a la derecha
              }}></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Especialidad" 
                fullWidth 
                select
                variant="outlined"
                value={selectedSpecialty}
                onChange={(event) => setSelectedSpecialty(event.target.value)}
              >
                <MenuItem value="todasLasEspecialidades">Todos</MenuItem> {/* Agrega la opción "TODOS" */}
                {specialties.map((specialty) => (
                  <MenuItem
                    key={specialty.idEspecialidad}
                    value={specialty.idEspecialidad}
                  >
                    {specialty.nombre}
                  </MenuItem>
                ))}
              </TextField>    

            </Grid>

            {/* <Grid
              item
              xs={12}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MUIButton
                variant="contained"
                color="primary"
                // startIcon={<PersonAddIcon />}
                fullWidth
                onClick={handleSearchClick}
              >
                Buscar
              </MUIButton>
            </Grid> */}
          </Grid>
        </Paper>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <DoctorTable doctorNameIngresado={doctorName} especialidad={selectedSpecialty} />
      </Container>
    </MainLayout>
  );
};

export default StaffManagement;
