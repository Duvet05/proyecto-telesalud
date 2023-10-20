import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Container } from "@mui/material";
import PatientInfoAppointment from "../components/appointments/PatientInfoAppointment";
import SelectMedic from "../components/appointments/SelectMedic";
import TriajeONo from "../components/appointments/TriageRequest";
import AppointmentInfo from "./AppointmentInfo";
import NavigationButtons from "../components/common/NavigationButtons";
import MainLayout from "@/components/layout/MainLayout";
import CustomizedDialog from "@/components/appointments/CustomizedDialog";
import { AppointmentsProvider, useAppointments } from "./AppointmentsContext";

const CONFIRM_EXIT_MESSAGE =
  "¿Está seguro de que desea abandonar esta página? Sus datos no guardados se perderán.";

const PAGES = [
  {
    component: <PatientInfoAppointment />,
    title: "Información del paciente",
  },
  {
    component: <SelectMedic />,
    title: "Seleccionar médico",
  },
  {
    component: <TriajeONo />,
    title: "Triage",
  },
  { component: <AppointmentInfo />, title: "Información de la cita" },
];

const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isProcessCompleted, setIsProcessCompleted] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const { appointmentData, setAppointmentData } = useAppointments();

  const navigate = (delta) => {
    const nextPage = Math.min(
      Math.max(currentPage + delta, 0),
      PAGES.length - 1
    );
    setCurrentPage(nextPage);
    setIsBackButtonVisible(nextPage !== 0);
  };

  const handleProcessCompletion = () => {
    setIsProcessCompleted(true);
  };

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = CONFIRM_EXIT_MESSAGE;
      return "";
    };

    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  return (
    <AppointmentsProvider>
      <MainLayout>
        <Container
          maxWidth="lg"
          style={{
            marginTop: "-40px",
            marginBottom: "20px",
            display: "flex", // Flex layout
            flexDirection: "column", // Column direction
            height: "85vh", // 100% of viewport height
          }}
        >
          <Paper
            style={{
              padding: "30px",
              flex: 1, // This will make the Paper take up all the available space
              overflowY: "auto", // This will add a scrollbar if content overflows
              marginBottom: "10px",
            }}
          >
            <Typography variant="h4" style={{ marginBottom: "30px" }}>
              {PAGES[currentPage].title}
            </Typography>
            <Grid>
              <Grid item xs={12}>
                {React.cloneElement(PAGES[currentPage].component, {
                  updateAppointmentData: setAppointmentData,
                  handleProcessCompletion: handleProcessCompletion,
                  pacienteData: appointmentData.selectedPatientData,
                  acompananteData: appointmentData.companionData,
                })}
              </Grid>
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <NavigationButtons
              currentPage={currentPage}
              totalPages={PAGES.length}
              navigate={navigate}
              isProcessCompleted={isProcessCompleted}
            />
          </Grid>
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

export default Appointments;
