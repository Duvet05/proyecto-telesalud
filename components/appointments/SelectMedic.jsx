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
import { medicService } from "../../services/medicService";
import { useAppointments } from "@/context/AppointmentsContext";

function SelectMedic() {
  const { appointmentData, setAppointmentData } = useAppointments();

  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [doctors, setDoctors] = useState([]);

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
    </Box>
  );
}

export default SelectMedic;
