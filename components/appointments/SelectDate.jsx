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
