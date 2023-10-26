import React, { useEffect, useMemo } from "react";
import { Button, Box, Typography, Fade, CircularProgress } from "@mui/material";
import { useAppointments } from "@/context/AppointmentsContext";
import PropTypes from "prop-types";

function AvailableHoursBlock({ availableHours = [], onHourClick, isLoading }) {
  const { appointmentData } = useAppointments();

  useEffect(() => {
    if (availableHours.length > 0 && !appointmentData.selectedHour) {
      onHourClick(availableHours[0].horaInicio);
    }
  }, [availableHours, appointmentData.selectedHour, onHourClick]);

  const formattedHours = useMemo(
    () =>
      availableHours.map((horario) => {
        const horaInicioFormateada = horario.horaInicio.slice(0, 5);
        const horaFinFormateada = horario.horaFin.slice(0, 5);
        return {
          ...horario,
          rangoHorario: `${horaInicioFormateada} - ${horaFinFormateada}`,
        };
      }),
    [availableHours]
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (availableHours.length === 0) {
    return (
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        No hay horarios disponibles
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        overflowY: "auto",
        maxHeight: "250px",
        mt: 2,
      }}
    >
      {formattedHours.map((horario, index) => (
        <Fade in key={horario.idTurno} timeout={500 * (index + 1)}>
          <Button
            variant={
              appointmentData.selectedHour === horario.horaInicio
                ? "contained"
                : "outlined"
            }
            fullWidth
            onClick={() => onHourClick(horario.horaInicio)}
            sx={{
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                backgroundColor:
                  appointmentData.selectedHour === horario.horaInicio
                    ? null
                    : "#e6e6e6",
              },
            }}
          >
            {horario.rangoHorario}
          </Button>
        </Fade>
      ))}
    </Box>
  );
}

AvailableHoursBlock.propTypes = {
  availableHours: PropTypes.arrayOf(
    PropTypes.shape({
      idTurno: PropTypes.number.isRequired,
      horaInicio: PropTypes.string.isRequired,
      horaFin: PropTypes.string.isRequired,
    })
  ).isRequired,
  onHourClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

AvailableHoursBlock.defaultProps = {
  isLoading: false,
};

export default AvailableHoursBlock;
