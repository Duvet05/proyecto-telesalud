import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SelectDate from "./SelectDate";
import { medicService } from "../../services/medicService";

function SelectMedic() {
  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);

  const fetchAvailableHours = (fecha, medicId) => {
    medicService
      .buscarHorariosByID(fecha, medicId)
      .then((data) => {
        setAvailableHours(data);
      })
      .catch((error) => {
        console.error("Error fetching available hours:", error);
      });
  };

  const fetchAvailableDays = (medicId) => {
    medicService
      .DiasDisponiblesByID(medicId)
      .then((data) => {
        setAvailableDays(data);
      })
      .catch((error) => {
        console.error("Error fetching available days:", error);
      });
  };

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableDays(selectedDoctor);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      fetchAvailableHours(selectedDate, selectedDoctor);
    }
  }, [selectedDate, selectedDoctor]);

  useEffect(() => {
    medicService
      .listarEspecialidades()
      .then((data) => {
        setSpecialties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching specialties:", error);
      });
  }, []);

  const obtenerDoctoresPorEspecialidad = async (especialidadNombre) => {
    try {
      const data = await medicService.buscarPorEspecialidad(especialidadNombre);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
      alert(
        "Ocurrió un error al buscar los médicos. Por favor, inténtalo de nuevo."
      );
    }
  };
  const handleHourChange = (hour) => {
    setSelectedHour(dayjs(hour).format("HH:mm:ss"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "0 auto",
      }}
    >
      <Autocomplete
        fullWidth
        disabled={isLoading}
        options={specialities}
        getOptionLabel={(option) => option.nombre}
        value={selectedSpeciality}
        onChange={async (event, newValue) => {
          setSelectedSpeciality(newValue);
          setSelectedDoctor("");
          if (newValue) {
            await obtenerDoctoresPorEspecialidad(newValue.nombre);
          } else {
            setDoctors([]);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Especialidad"
            variant="outlined"
            placeholder="Seleccionar Especialidad"
          />
        )}
      />

      {selectedSpeciality && (
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Médico</InputLabel>
          <Select
            value={selectedDoctor}
            onChange={(event) => setSelectedDoctor(event.target.value)}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.idPersona} value={doctor.idPersona}>
                {`${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
                  doctor.apellidoPaterno
                } ${doctor.apellidoMaterno}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedDoctor && (
        <SelectDate
          onDateChange={setSelectedDate}
          selectedDate={selectedDate}
          availableHours={availableHours}
          availableDays={availableDays}
          onHourChange={handleHourChange}
          selectedHour={selectedHour}
        />
      )}
    </Box>
  );
}

export default SelectMedic;
