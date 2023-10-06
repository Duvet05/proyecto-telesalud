// Appointments.jsx
import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentInfo from "./AppointmentInfo";
import SelectMedic from "../components/appointments/SelectMedic";
import NavigationButtons from "../components/common/NavigationButtons";
import MainLayout from "@/components/layout/MainLayout";
import TriajeONo from "../components/appointments/TriageRequest";
import CustomizedDialog from "@/components/appointments/CustomizedDialog";

const CONFIRM_EXIT_MESSAGE =
  "¿Está seguro de que desea abandonar esta página? Sus datos no guardados se perderán.";

const PAGES = [
  { component: <AppointmentForm />, title: "Información del paciente" },
  { component: <SelectMedic />, title: "Seleccionar médico" },
  { component: <TriajeONo />, title: "Triage" },
  { component: <AppointmentInfo />, title: "Información de la cita" },
];
const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isProcessCompleted, setIsProcessCompleted] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  const navigate = (delta) => {
    const nextPage = Math.min(
      Math.max(currentPage + delta, 0),
      PAGES.length - 1
    );
    setCurrentPage(nextPage);
    setIsBackButtonVisible(nextPage !== 0);

    if (nextPage === PAGES.length - 1) {
      setIsProcessCompleted(true);
    }
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
              {PAGES[currentPage].component}
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs={12}>
          <NavigationButtons
            currentPage={currentPage}
            totalPages={PAGES.length}
            navigate={navigate}
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
  );
};

export default Appointments;
