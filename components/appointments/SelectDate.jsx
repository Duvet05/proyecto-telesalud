import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { Typography, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AvailableHoursBlock from "./AvailableHoursBlock";

/**
 * Renders a day in the calendar with a badge if the day is selected.
 */
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

/**
 * Allows users to select a date from the calendar and an hour from available hours.
 */
export default function SelectDate({
  onDateChange,
  selectedDate,
  availableHours,
  availableDays,
  onHourChange,
  selectedHour,
}) {
  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    // Convert the availableDays to an array of day numbers
    const daysToHighlight = availableDays.map((date) => dayjs(date).date());
    setHighlightedDays(daysToHighlight);
  }, [availableDays]);

  const handleDateChange = (newDate) => {
    onDateChange(dayjs(newDate).format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center" gap={3}>
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            Selecciona una Fecha disponible:
          </Typography>
          <DateCalendar
            onChange={handleDateChange}
            value={selectedDate ? dayjs(selectedDate) : null}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Selecciona una hora disponible:
          </Typography>
          <AvailableHoursBlock
            availableHours={availableHours}
            onHourClick={onHourChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
