import React, { useState, useEffect } from "react";
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
    const fetchSpecialties = async () => {
      try {
        const data = await medicService.listarEspecialidades();
        setSpecialties(data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpecialties();
  }, []);

  const handleSpecialityChange = async (_, newValue) => {
    setSelectedSpeciality(newValue);
    setAppointmentData((prev) => ({ ...prev, selectedDoctor: null }));
    setDoctors(
      newValue ? await obtenerDoctoresPorEspecialidad(newValue.nombre) : []
    );
  };

  const obtenerDoctoresPorEspecialidad = async (especialidadNombre) => {
    try {
      return await medicService.buscarPorEspecialidad(especialidadNombre);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert(
        "Ocurrió un error al buscar los médicos. Por favor, inténtalo de nuevo."
      );
      return [];
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    const selectedDoctor = doctors.find((doc) => doc.idPersona === doctorId);
    setAppointmentData((prev) => ({ ...prev, selectedDoctor }));
  };

  const renderDoctorName = (doctor) =>
    `${doctor.sexo === "M" ? "Dr." : "Dra."} ${doctor.nombres} ${
      doctor.apellidoPaterno
    } ${doctor.apellidoMaterno}`;

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
        onChange={handleSpecialityChange}
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
            value={appointmentData.selectedDoctor?.idPersona || ""}
            onChange={handleDoctorChange}
            renderValue={(selected) =>
              selected ? (
                renderDoctorName(appointmentData.selectedDoctor)
              ) : (
                <em>Selecciona un médico</em>
              )
            }
          >
            {doctors.map((doc) => (
              <MenuItem key={doc.idPersona} value={doc.idPersona}>
                {renderDoctorName(doc)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}

export default SelectMedic;
