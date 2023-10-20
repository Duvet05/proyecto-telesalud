import React, { useState, useEffect } from "react";
import { Typography, Grid, Slide, Box, Divider } from "@mui/material";
import PatientSearchAppointment from "./PatientSearchAppointment";
import PatientFieldsAppointment from "./PatientFieldsAppointment";
import CompanionFields from "./CompanionFields";
import CompanionQuestion from "./CompanionQuestion";
import { patientService } from "../../services/patientService";

function PatientInfoAppointment() {
  const [formData, setFormData] = useState({
    hasCompanion: "no",
    isEditing: false,
    allPatients: [],
    searchResult: null,
    showFields: false,
    error: null,
  });

  const [companionData, setCompanionData] = useState({
    documentoIdentidad: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
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
      isEditing: false,
    }));
  };

  const handleAddPatientClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      showFields: true,
      isEditing: true,
      searchResult: null,
    }));
  };

  const handleCancelClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      isEditing: false,
      searchResult: null,
      showFields: false,
    }));
  };

  const handleCompanionDataReceived = (companionData) => {
    setCompanionData(companionData);
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
            onAdd={
              formData.isEditing ? handleCancelClick : handleAddPatientClick
            }
            isEditing={formData.isEditing}
            disabled={formData.isEditing}
          />
        </Grid>

        {(formData.showFields || !formData.isEditing) && (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        )}

        {(formData.showFields || !formData.isEditing) && (
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
        )}
        {(formData.showFields || !formData.isEditing) && (
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
        )}
        {formData.hasCompanion === "no" && (
          <Grid item xs={12}>
            <Slide in direction="up" timeout={900}>
              <div>
                <CompanionFields
                  onCompanionDataReceived={handleCompanionDataReceived}
                />
              </div>
            </Slide>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default PatientInfoAppointment;
