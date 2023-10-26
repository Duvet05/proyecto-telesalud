import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Fade } from "@mui/material";
import { useAppointments } from "@/context/AppointmentsContext";

function AvailableHoursBlock({ availableHours = [], onHourClick }) {
  const { appointmentData, setAppointmentData } = useAppointments();
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    setSelectedHour(null);
  }, [appointmentData.selectedHour]);

  if (availableHours.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          width: 400,
          alignItems: "center",
        }}
      >
        No hay horarios disponibles
      </Typography>
    );
  }

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    onHourClick(hour);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        overflowY: "auto",
        maxHeight: "250px",
      }}
    >
      {availableHours.map((horario, index) => {
        const { idTurno, horaInicio, horaFin } = horario;
        const horaInicioFormateada = horaInicio.slice(0, 5);
        const horaFinFormateada = horaFin.slice(0, 5);
        const rangoHorario = `${horaInicioFormateada} - ${horaFinFormateada}`;
        const isSelected = horaInicio === selectedHour;

        return (
          <Fade in={true} timeout={500 * (index + 1)} key={idTurno}>
            <Button
              variant={isSelected ? "contained" : "outlined"}
              fullWidth
              onClick={() => handleHourClick(horaInicio)}
              sx={{
                textTransform: "none",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: isSelected ? "#1a75ff" : "#e6e6e6",
                },
              }}
            >
              {rangoHorario}
            </Button>
          </Fade>
        );
      })}
    </Box>
  );
}

export default AvailableHoursBlock;
