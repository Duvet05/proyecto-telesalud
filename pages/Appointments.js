import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Container } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import CustomizedDialog from "@/components/appointments/CustomizedDialog";
import { AppointmentsProvider, useAppointments } from "./AppointmentsContext";

// Componentes
import PatientInfoAppointment from "../components/appointments/PatientInfoAppointment";
import SelectMedic from "../components/appointments/SelectMedic";
import TriajeONo from "../components/appointments/TriageRequest";
import AppointmentInfo from "./AppointmentInfo";
import NavigationButtons from "../components/common/NavigationButtons";

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
  const { appointmentData, setAppointmentData } = useAppointments();

  const navigateToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
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
            display: "flex",
            flexDirection: "row",
            height: "85vh",
            width: "190vh",
          }}
        >
          <Paper
            style={{
              width: "70%", // fijo pero escalable
              padding: "30px",
              overflowY: "auto",
              marginBottom: "10px",
              marginRight: "2%", // Espacio entre Paper y nav
            }}
          >
            <Typography variant="h4" style={{ marginBottom: "30px" }}>
              {PAGES[currentPage].title}
            </Typography>
            <Grid>
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
            style={{
              width: "30%",
              paddingTop: "20px",
              paddingLeft: "20px",
              fontSize: "20px",
              color: "#333",
            }}
          >
            <ul>
              {PAGES.map((page, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px 0",
                    cursor: "pointer",
                    borderLeft:
                      currentPage === index
                        ? "4px solid #ffd700"
                        : "4px solid transparent",
                    fontWeight: currentPage === index ? "bold" : "normal",
                  }}
                  onClick={() => navigateToPage(index)}
                >
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                      color: currentPage === index ? "#ffd700" : "#333",
                    }}
                  >
                    {page.title}
                  </span>
                </li>
              ))}
            </ul>
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

export default Appointments;
