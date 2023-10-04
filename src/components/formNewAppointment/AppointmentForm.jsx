import React, { useState, useEffect } from "react";
import { Typography, Grid, Slide, Box } from "@mui/material";
import PatientSearch from "./PatientSearch";
import PatientFields from "./PatientFields";
import CompanionFields from "./CompanionFields";
import CompanionQuestion from "./CompanionQuestion";
import { patientService } from "../../services/patientService";

const initialState = {
  hasCompanion: "no",
  isEditing: false,
  allPatients: [],
  searchResult: null,
  showFields: false,
  error: null,
};

const fetchPatients = async (updateState) => {
  try {
    const data = await patientService.listar();
    updateState((prev) => ({ ...prev, allPatients: data }));
  } catch (err) {
    console.error("Error al obtener la lista de pacientes:", err);
    updateState((prev) => ({
      ...prev,
      error: "Error al obtener la lista de pacientes",
    }));
  }
};

function AppointmentForm() {
  const [state, setState] = useState(initialState);
  const {
    hasCompanion,
    isEditing,
    allPatients,
    searchResult,
    showFields,
    error,
  } = state;

  useEffect(() => {
    fetchPatients(setState);
  }, []);

  const handlePatientSelect = (value) => {
    setState((prev) => ({
      ...prev,
      searchResult: value,
      showFields: true,
      isEditing: false,
    }));
  };

  const handleAddPatientClick = () => {
    setState((prev) => ({
      ...prev,
      showFields: true,
      isEditing: true,
      searchResult: null,
    }));
  };

  const handleCancelClick = () => {
    setState((prev) => ({ ...prev, showFields: false, isEditing: false }));
  };

  return (
    <Box padding={2} bgcolor="#fff">
      <Typography variant="h4" gutterBottom>
        Búsqueda de Paciente
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PatientSearch
            allPatients={allPatients}
            onSelect={handlePatientSelect}
            onAdd={isEditing ? handleCancelClick : handleAddPatientClick}
            isEditing={isEditing}
            disabled={isEditing}
          />
        </Grid>
        {showFields && (
          <>
            <Grid item xs={12}>
              <Slide in direction="up" timeout={500}>
                <div>
                  <PatientFields
                    isDisabled={!isEditing}
                    patientData={searchResult}
                  />
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12}>
              <Slide in direction="up" timeout={700}>
                <div>
                  <CompanionQuestion
                    value={hasCompanion}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        hasCompanion: e.target.value,
                      }))
                    }
                  />
                </div>
              </Slide>
            </Grid>
            {hasCompanion === "yes" && (
              <Grid item xs={12}>
                <Slide in direction="up" timeout={900}>
                  <div>
                    <CompanionFields />
                  </div>
                </Slide>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default AppointmentForm;
