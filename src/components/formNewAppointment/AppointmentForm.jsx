import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import PatientSearch from "./PatientSearch";
import { patientService } from "../../services/patientService";
import PatientFields from "./PatientFields";
import CompanionFields from "./CompanionFields";
import CompanionQuestion from "./CompanionQuestion";

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

function AppointmentForm() {
  const [hasCompanion, setHasCompanion] = useState("no");
  const [isEditing, setIsEditing] = useState(true);
  const [allPatients, setAllPatients] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    patientService
      .listar()
      .then((data) => setAllPatients(data))
      .catch((error) => {
        console.error("Error al obtener la lista de pacientes:", error);
      });
  }, []);

  const handlePatientSelect = (value) => {
    setSearchResult(value);
  };

  const handleAddPatientClick = () => {
    // Maneja la lógica para agregar un paciente aquí. Navega a un formulario, etc.
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Búsqueda de Paciente
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PatientSearch
            allPatients={allPatients}
            onSelect={handlePatientSelect}
            onAdd={handleAddPatientClick}
          />
        </Grid>

        <Grid item xs={12}>
          <PatientFields isDisabled={!isEditing} patientData={searchResult} />
        </Grid>

        <Grid item xs={12}>
          <CompanionQuestion
            value={hasCompanion}
            onChange={(e) => setHasCompanion(e.target.value)}
          />
        </Grid>

        {hasCompanion === "yes" && (
          <Grid item xs={12}>
            <CompanionFields />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default AppointmentForm;
