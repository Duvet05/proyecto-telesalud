import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppointments } from "@/pages/AppointmentsContext";

function TestReservedDateTime() {
  const { appointmentData } = useAppointments();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Fecha y Hora Reservada
      </Typography>
      <Box sx={{ marginBottom: 4, color: "black" }}>
        {appointmentData.selectedDate && appointmentData.selectedHour ? (
          <Typography>
            Fecha: {appointmentData.selectedDate}
            <br />
            Hora: {appointmentData.selectedHour}
          </Typography>
        ) : (
          <Typography>No hay fecha ni hora reservada</Typography>
        )}
      </Box>
    </>
  );
}

export default TestReservedDateTime;
