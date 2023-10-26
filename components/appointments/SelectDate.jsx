import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { Badge, Typography, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  PickersDay,
  DateCalendar,
} from "@mui/x-date-pickers";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { useAppointments } from "@/context/AppointmentsContext";
import { medicService } from "../../services/medicService";

function ServerDay({
  highlightedDays = [],
  day,
  outsideCurrentMonth,
  ...other
}) {
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✅" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function SelectDate() {
  const { appointmentData, setAppointmentData } = useAppointments();
  const [highlightedDays, setHighlightedDays] = useState([]);

  const handleHourChange = (hour) => {
    const formattedHour = dayjs(hour).format("HH:mm:ss");
    setAppointmentData((prevData) => ({
      ...prevData,
      selectedHour: formattedHour,
    }));
  };

  const fetchAvailableHours = (fecha, medicId) => {
    medicService
      .buscarHorariosByID(fecha, medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableHours: data }));
      })
      .catch((error) => {
        console.error("Error fetching available hours:", error);
      });
  };

  const fetchAvailableDays = (medicId) => {
    medicService
      .DiasDisponiblesByID(medicId)
      .then((data) => {
        setAppointmentData((prev) => ({ ...prev, availableDays: data }));
      })
      .catch((error) => {
        console.error("Error fetching available days:", error);
      });
  };

  useEffect(() => {
    if (appointmentData.selectedDoctor) {
      fetchAvailableDays(appointmentData.selectedDoctor.idPersona);
    }
  }, [appointmentData.selectedDoctor]);

  useEffect(() => {
    if (appointmentData.selectedDate && appointmentData.selectedDoctor) {
      fetchAvailableHours(
        appointmentData.selectedDate,
        appointmentData.selectedDoctor.idPersona
      );
    }
  }, [appointmentData.selectedDate, appointmentData.selectedDoctor]);

  useEffect(() => {
    const daysToHighlight = appointmentData.availableDays.map((date) =>
      dayjs(date).date()
    );
    setHighlightedDays(daysToHighlight);
  }, [appointmentData.availableDays]);

  const handleDateChange = useCallback(
    (newDate) => {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedDate: dayjs(newDate).format("YYYY-MM-DD"),
      }));
    },
    [setAppointmentData]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="subtitle1" gutterBottom sx={{ padding: "-20vh" }}>
        Selecciona una Fecha y hora disponible:
      </Typography>

      <Box
        display="flex"
        sx={{ width: "120vh", maxHeight: "260px", pr: "2vh" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            margin: "0 auto",
          }}
        >
          <DateCalendar
            onChange={handleDateChange}
            value={
              appointmentData.selectedDate
                ? dayjs(appointmentData.selectedDate)
                : null
            }
            slots={{ day: ServerDay }}
            slotProps={{ day: { highlightedDays } }}
          />{" "}
          {appointmentData.selectedDate && appointmentData.selectedHour ? (
            <Typography>
              Fecha y Hora: {appointmentData.selectedDate}{" "}
              {appointmentData.selectedHour}
            </Typography>
          ) : (
            <Typography>No hay fecha ni hora reservada</Typography>
          )}
        </Box>
        <AvailableHoursBlock
          availableHours={appointmentData.availableHours}
          onHourClick={(hour) => {
            setAppointmentData((prevData) => ({
              ...prevData,
              selectedHour: hour,
            }));
          }}
          selectedDate={appointmentData.selectedDate}
        />
      </Box>
    </LocalizationProvider>
  );
}
