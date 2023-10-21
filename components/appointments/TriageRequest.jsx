import React, { useState } from "react";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useAppointments } from "@/pages/AppointmentsContext";

const TriageRequest = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const { setAppointmentData } = useAppointments(); // Usamos el hook personalizado

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "option1") {
      setAppointmentData((prevData) => ({ ...prevData, selectedTriage: true }));
    } else if (button === "option2") {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedTriage: false,
      }));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h6" gutterBottom align="center">
          ¿Desea enviar al paciente a triaje?
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={6}>
            <Button
              variant={selectedButton === "option1" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleButtonClick("option1")}
              fullWidth
            >
              Sí, enviar a triaje
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={selectedButton === "option2" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => handleButtonClick("option2")}
              fullWidth
            >
              No, no enviar a triaje
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TriageRequest;
