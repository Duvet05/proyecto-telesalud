import React, { useState, useEffect } from "react";
import { Typography, Grid, Slide, Box } from "@mui/material";
import PatientSearch from "./PatientSearch";
import PatientFields from "./PatientFields";
import CompanionFields from "./CompanionFields";
import CompanionQuestion from "./CompanionQuestion";
import { patientService } from "../../services/patientService";

function AppointmentForm() {
  const [hasCompanion, setHasCompanion] = useState("no");
  const [isEditing, setIsEditing] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [showFields, setShowFields] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await patientService.listar();
        setAllPatients(data);
      } catch (err) {
        console.error("Error al obtener la lista de pacientes:", err);
        setError("Error al obtener la lista de pacientes");
      }
    }
    fetchPatients();
  }, []);

  const handlePatientSelect = (value) => {
    setSearchResult(value);
    setShowFields(true);
    setIsEditing(false);
  };

  const handleAddPatientClick = () => {
    setShowFields(true);
    setIsEditing(true);
    setSearchResult(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSearchResult(null);
    setShowFields(false);
  };

  return (
    <Box padding={2} bgcolor="#fff">
      <Typography variant="h5" gutterBottom>
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
                    onChange={(e) => setHasCompanion(e.target.value)}
                  />
                </div>
              </Slide>
            </Grid>

            {hasCompanion === "no" && (
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
