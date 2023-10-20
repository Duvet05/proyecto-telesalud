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

export default function SelectDate(props) {
  const {
    onDateChange,
    selectedDate,
    availableHours,
    availableDays,
    onHourChange,
  } = props;

  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    const daysToHighlight = availableDays.map((date) => dayjs(date).date());
    setHighlightedDays(daysToHighlight);
  }, [availableDays]);

  const handleDateChange = useCallback(
    (newDate) => {
      onDateChange(dayjs(newDate).format("YYYY-MM-DD"));
    },
    [onDateChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="subtitle1" gutterBottom>
        Selecciona una Fecha y hora disponible:
      </Typography>

      <Box display="flex" sx={{ width: 800, margin: 5 }}>
        <DateCalendar
          onChange={handleDateChange}
          value={selectedDate ? dayjs(selectedDate) : null}
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } }}
        />
        <AvailableHoursBlock
          sx={{ width: 800, margin: 5 }}
          availableHours={availableHours}
          onHourClick={onHourChange}
          selectedDate={selectedDate}
        />
      </Box>
    </LocalizationProvider>
  );
}
