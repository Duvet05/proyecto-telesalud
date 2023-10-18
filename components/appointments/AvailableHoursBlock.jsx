import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Fade } from "@mui/material";

function AvailableHoursBlock({ availableHours, onHourClick, selectedDate }) {
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    // Restablece la hora seleccionada cuando cambia la fecha
    setSelectedHour(null);
  }, [selectedDate]);

  if (availableHours.length === 0) {
    return <Typography variant="body1">No hay horarios disponibles</Typography>;
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
        overflowY: "auto",
        maxHeight: "300px",
      }}
    >
      {availableHours.map((hour, index) => {
        const horaInicio = hour.slice(0, 5);
        const horaFin = availableHours[index + 1]
          ? availableHours[index + 1].slice(0, 5)
          : null;

        if (!horaFin) return null;

        const rangoHorario = `${horaInicio} - ${horaFin}`;
        const isSelected = hour === selectedHour;

        return (
          <Fade in={true} timeout={500 * (index + 1)}>
            <Button
              key={index}
              variant={isSelected ? "contained" : "outlined"}
              fullWidth
              onClick={() => handleHourClick(hour)}
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
