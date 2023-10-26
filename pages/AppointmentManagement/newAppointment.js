import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import CustomizedDialog from "@/components/appointments/CustomizedDialog";
import {
  AppointmentsProvider,
  useAppointments,
} from "@/context/AppointmentsContext";

import PatientInfoAppointment from "@/components/appointments/PatientInfoAppointment";
import SelectMedic from "@/components/appointments/SelectMedic";
import TriajeONo from "@/components/appointments/TriageRequest";
import AppointmentInfo from "@/components/appointments/AppointmentInfo";
import CompanionInfo from "@/components/appointments/CompanionInfo";
import SelectDate from "@/components/appointments/SelectDate";

const CONFIRM_EXIT_MESSAGE =
  "¿Está seguro de que desea abandonar esta página? Sus datos no guardados se perderán.";

const PAGES = [
  { component: <PatientInfoAppointment />, title: "Información del paciente" },
  { component: <CompanionInfo />, title: "Responsable legal" },
  { component: <SelectMedic />, title: "Seleccionar médico" },
  { component: <SelectDate />, title: "Seleccionar fecha" },
  { component: <TriajeONo />, title: "Triage" },
  { component: <AppointmentInfo />, title: "Información de la cita" },
];

const NewAppointment = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isProcessCompleted, setIsProcessCompleted] = useState(false);
  const { appointmentData, setAppointmentData } = useAppointments();

  const navigateToPage = (pageIndex) => setCurrentPage(pageIndex);

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = CONFIRM_EXIT_MESSAGE;
      return "";
    };

    window.addEventListener("beforeunload", confirmExit);
    return () => window.removeEventListener("beforeunload", confirmExit);
  }, []);

  return (
    <AppointmentsProvider>
      <MainLayout>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", height: "85vh", width: "100%" }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "140vh",
              padding: "30px",
              overflowY: "auto",
              mb: "10px",
              mr: "2%",
              height: "75vh", // Establece un tamaño fijo
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: "30px", fontWeight: "bold", color: "#333" }}
            >
              {PAGES[currentPage].title}
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                {React.cloneElement(PAGES[currentPage].component, {
                  updateAppointmentData: setAppointmentData,
                  pacienteData: appointmentData.selectedPatientData,
                  acompananteData: appointmentData.companionData,
                })}
              </Grid>
            </Grid>
          </Paper>
          <nav
            sx={{
              width: "10%",
              pt: "20px",
              pl: "20px",
              fontSize: "1px",
              color: "#333",
            }}
          >
            <List>
              {PAGES.map((page, index) => (
                <ListItem
                  key={index}
                  sx={{
                    p: "10px 0",
                    cursor: "pointer",
                    borderLeft:
                      currentPage === index
                        ? "4px solid #ffd700"
                        : "4px solid transparent",
                    fontWeight: currentPage === index ? "bold" : "normal",
                  }}
                  onClick={() => navigateToPage(index)}
                >
                  <ListItemText
                    primary={page.title}
                    primaryTypographyProps={{
                      sx: {
                        pl: "20px",
                        color: currentPage === index ? "#ffd700" : "#333",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </nav>
        </Container>
        {isProcessCompleted && (
          <CustomizedDialog
            onClose={() => setIsProcessCompleted(false)}
            open={isProcessCompleted}
          />
        )}
      </MainLayout>
    </AppointmentsProvider>
  );
};

export default NewAppointment;
