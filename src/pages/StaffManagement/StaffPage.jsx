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
} from "@mui/material";
import { Autocomplete } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { medicService } from "../../services/medicService"; // Importa el servicio de doctores
import DoctorTable from "../../components/common/tables/DoctorTable";

const StaffPage = () => {
  const [doctorName, setDoctorName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
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
    if (doctorName.trim() !== "") {
      setLoading(true);
      setError(null);
      medicService
        .buscarPorNombre(doctorName)
        .then((result) => {
          setDoctors(result);
        })
        .catch((error) => {
          console.error("Error al buscar doctores por nombre", error);
          setError("Error al buscar doctores por nombre");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Container maxWidth={false} style={{ height: "100vh" }}>
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Seleccionar Doctor
      </Typography>

      <Paper sx={{ my: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Autocomplete
              options={doctors}
              loading={loading}
              value={doctorName}
              onChange={(_, newValue) => {
                setDoctorName(newValue);
              }}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar por nombre"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              select
              label="Especialidad"
              value={selectedSpecialty}
              onChange={(event) => setSelectedSpecialty(event.target.value)}
            >
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

          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <MUIButton
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              fullWidth
              onClick={handleSearchClick}
            >
              Seleccionar
            </MUIButton>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <DoctorTable doctors={doctors} />
    </Container>
  );
};

export default StaffPage;
