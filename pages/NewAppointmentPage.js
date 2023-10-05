import React, { useState, useEffect } from "react";
import { Typography, Paper, Grid, Button, Container } from "@mui/material";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AskForTriage from "../components/appointments/AskForTriage";
import AppointmentInfo from "./AppointmentInfo";
import SelectMedic from "../components/appointments/SelectMedic";
import NavigationButtons from "../components/common/NavigationButtons";
import MainLayout from "@/components/layout/MainLayout";

const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  const openTriagePopup = () => {
    setIsTriageOpen(true);
  };

  const closeTriagePopup = () => {
    setIsTriageOpen(false);
  };

  const navigate = (delta) => {
    const nextPage = Math.min(
      Math.max(currentPage + delta, 0),
      PAGES.length - 1
    );
    setCurrentPage(nextPage);

    // Si nextPage es la última página, mostrar el pop-up de triaje
    if (nextPage === PAGES.length - 1) {
      openTriagePopup();
    }
  };

  const PAGES = [<AppointmentForm navigate={navigate} />, <SelectMedic />];

  const PAGE_TITLES = ["Información del paciente", "Seleccionar médico"];

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue =
        "¿Está seguro de que desea abandonar esta página? Sus datos no guardados se perderán.";

      return "";
    };

    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  return (
    <MainLayout>
      {" "}
      <Container>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Nueva Atención
          </Typography>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {PAGE_TITLES[currentPage]}
              </Typography>
              {PAGES[currentPage]}
            </Grid>
            {currentPage !== PAGES.length - 1 && ( // No renderizar NavigationButtons en la última página
              <Grid item xs={12}>
                <NavigationButtons
                  currentPage={currentPage}
                  totalPages={PAGES.length}
                  navigate={navigate}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
        <AskForTriage
          open={isTriageOpen}
          onClose={() => setIsTriageOpen(false)}
        />
      </Container>
    </MainLayout>
  );
};

export default Appointments;
