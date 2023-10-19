import React, { useState, useEffect } from "react";
import { Typography, Grid, Slide, Box } from "@mui/material";
import PatientSearchAppointment from "./PatientSearchAppointment";
import PatientFieldsAppointment from "./PatientFieldsAppointment";
import CompanionFields from "./CompanionFields"; // Ya refactorizado
import CompanionQuestion from "./CompanionQuestion";
import { patientService } from "../../services/patientService";

function PatientInfoAppointment() {
  const [formData, setFormData] = useState({
    hasCompanion: "no",
    allPatients: [],
    searchResult: null,
    showFields: false,
    error: null,
  });

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await patientService.listar();
        setFormData((prevData) => ({ ...prevData, allPatients: data }));
      } catch (err) {
        console.error("Error al obtener la lista de pacientes:", err);
        setFormData((prevData) => ({
          ...prevData,
          error: "Error al obtener la lista de pacientes",
        }));
      }
    }
    fetchPatients();
  }, []);

  const handlePatientSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      searchResult: value,
      showFields: true,
      hasCompanion: "no", // Añadido para reiniciar la opción del acompañante
    }));
  };

  const handleAddPatientClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      showFields: true,
      hasCompanion: "no", // Añadido para reiniciar la opción del acompañante
    }));
  };

  return (
    <Box padding={2} bgcolor="#fff">
      {formData.error && (
        <Typography color="error">{formData.error}</Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PatientSearchAppointment
            allPatients={formData.allPatients}
            onSelect={handlePatientSelect}
            onAdd={handleAddPatientClick}
            isEditing={formData.isEditing}
            disabled={formData.isEditing}
          />
        </Grid>

        {formData.showFields && (
          <>
            <Grid item xs={12}>
              <Slide in direction="up" timeout={500}>
                <div>
                  <PatientFieldsAppointment
                    isDisabled={!formData.isEditing}
                    patientData={formData.searchResult}
                  />
                </div>
              </Slide>
            </Grid>

            <Grid item xs={12}>
              <Slide in direction="up" timeout={700}>
                <div>
                  <CompanionQuestion
                    value={formData.hasCompanion}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        hasCompanion: e.target.value,
                      }))
                    }
                  />
                </div>
              </Slide>
            </Grid>

            {formData.hasCompanion === "no" && (
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

export default PatientInfoAppointment;
