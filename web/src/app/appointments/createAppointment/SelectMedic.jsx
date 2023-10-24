import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SelectDate from "./SelectDate";
import { medicService } from "../../services/medicService";
import { useAppointments } from "@/pages/AppointmentsContext";

function SeleccionarMedico() {
  const { appointmentData, setAppointmentData } = useAppointments();

  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [doctors, setDoctors] = useState([]);

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
    const formattedHour = dayjs(hour).format("HH:mm:ss");
    setAppointmentData((prevData) => ({
      ...prevData,
      selectedHour: formattedHour,
    }));
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
          setAppointmentData((prevData) => ({
            ...prevData,
            selectedDoctor: "",
          }));
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
            value={appointmentData.selectedDoctor || ""}
            onChange={(event) => {
              const doctorId = event.target.value;
              const selectedDoc = doctors.find(
                (doctor) => doctor.idPersona === doctorId
              );
              setAppointmentData((prevData) => ({
                ...prevData,
                selectedDoctor: selectedDoc,
              }));
            }}
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

      {appointmentData.selectedDoctor && (
        <SelectDate
          onDateChange={(date) => {
            setAppointmentData((prevData) => ({
              ...prevData,
              selectedDate: dayjs(date).format("YYYY-MM-DD"),
            }));
          }}
          selectedDate={appointmentData.selectedDate}
          onHourChange={handleHourChange}
          selectedHour={appointmentData.selectedHour}
        />
      )}
    </Box>
  );
}

export default SeleccionarMedico;
