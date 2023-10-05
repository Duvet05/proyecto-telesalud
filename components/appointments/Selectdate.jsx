import React from "react";
import dayjs from "dayjs";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";

function Selectdate({
  onDateChange,
  selectedDate,
  availableHours,
  onHourChange,
  selectedHour,
}) {
  const handleDateChange = (newDate) => {
    onDateChange(dayjs(newDate).format("YYYY-MM-DD"));
  };

  const handleHourSelectChange = (event) => {
    onHourChange(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Selecciona una fecha:
        </Typography>
        <DateCalendar
          onChange={handleDateChange}
          value={selectedDate ? dayjs(selectedDate) : null}
        />
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Selecciona una hora disponible:
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-hour-label">Horas Disponibles</InputLabel>
          <Select
            labelId="select-hour-label"
            label="Horas Disponibles" // Esta prop conecta el Select con el InputLabel
            value={selectedHour}
            onChange={handleHourSelectChange}
          >
            {availableHours.map((hour, index) => (
              <MenuItem key={index} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
}

export default Selectdate;
