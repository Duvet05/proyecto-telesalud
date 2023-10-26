import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Grid,
  Box,
  Divider,
  TextField,
  Autocomplete,
  Button,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PatientFieldsAppointment from "./PatientFieldsAppointment";
import { patientService } from "../../services/patientService";
import { useAppointments } from "@/context/AppointmentsContext";
import CompanionInfo from "./CompanionInfo";

function PatientInfoAppointment() {
  const [state, setState] = useState({
    allPatients: [],
    showFields: false,
    hasCompanion: "no",
    isEditing: false,
    error: null,
  });

  const { appointmentData, setAppointmentData } = useAppointments();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const patients = await patientService.listar();
        setState((prev) => ({ ...prev, allPatients: patients }));
      } catch (err) {
        console.error("Error fetching patients list:", err);
        setState((prev) => ({
          ...prev,
          error: "Error al obtener la lista de pacientes",
        }));
      }
    }
    fetchPatients();
  }, []);

  const handlePatientSelect = useCallback(
    (value) => {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedPatientData: value,
      }));
      setState((prev) => ({ ...prev, showFields: true, isEditing: false }));
    },
    [setAppointmentData]
  );

  const handleAddOrCancel = () => {
    setState((prev) => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const buttonConfig = {
    color: state.isEditing ? "error" : "primary",
    icon: state.isEditing ? <CloseIcon /> : <AddIcon />,
    title: state.isEditing ? "Cancelar" : "Agregar paciente",
  };

  return (
    <Box padding={2} bgcolor="#fff">
      {state.error && <Typography color="error">{state.error}</Typography>}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Autocomplete
              options={state.allPatients}
              getOptionLabel={(option) =>
                `${option.nombres} ${option.apellidoPaterno} ${option.apellidoMaterno}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar por nombre..."
                  variant="outlined"
                  fullWidth
                  disabled={state.isEditing}
                  sx={{ flex: 1, width: "100vh", marginRight: 2 }}
                />
              )}
              onChange={(event, value) => handlePatientSelect(value)}
              disabled={state.isEditing}
            />
            <Tooltip title={buttonConfig.title}>
              <Button
                color={buttonConfig.color}
                onClick={handleAddOrCancel}
                variant="contained"
                startIcon={buttonConfig.icon}
                disabled={!!appointmentData.selectedPatientData}
                sx={{ height: "56px", width: "250px" }}
              >
                {buttonConfig.title}
              </Button>
            </Tooltip>
          </Box>
        </Grid>

        {state.showFields && (
          <>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <PatientFieldsAppointment
                isDisabled={!state.isEditing}
                patientData={appointmentData.selectedPatientData}
                onFormDataChange={(updatedFormData) => {
                  if (state.isEditing) {
                    setAppointmentData((prevData) => ({
                      ...prevData,
                      newPatientData: updatedFormData,
                    }));
                  } else {
                    setAppointmentData((prevData) => ({
                      ...prevData,
                      selectedPatientData: updatedFormData,
                    }));
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CompanionInfo
                value={state.hasCompanion}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    hasCompanion: e.target.value,
                  }))
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default PatientInfoAppointment;
