import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button as MUIButton,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";
import DoctorTable from "../../components/doctor/DoctorTable";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const StaffPage = () => {
  const [doctorName, setDoctorName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const specialties = ["Cardiología", "Dermatología", "Neurología"];

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
              value={doctorName}
              onChange={(event, newValue) => {
                setDoctorName(newValue);
              }}
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
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
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
            >
              Seleccionar
            </MUIButton>
          </Grid>
        </Grid>
      </Paper>

      <DoctorTable />
    </Container>
  );
};

export default StaffPage;
