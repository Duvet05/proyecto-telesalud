import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Selectdate from "./Selectdate";
import { doctorService } from "../../services/doctorService";

function SeleccionarMedico() {
  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [doctors, setDoctors] = useState([]); // Array para almacenar los doctores por especialidad
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    doctorService
      .listarEspecialidades()
      .then((data) => {
        setSpecialties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching specialties:", error);
        // Consider adding user-friendly error notifications using something like 'react-toastify'.
      });
  }, []);

  // Función para obtener los doctores por especialidad
  const obtenerDoctoresPorEspecialidad = (especialidadNombre) => {
    doctorService
      .buscarDoctoresPorEspecialidad(especialidadNombre)
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        // Consider adding user-friendly error notifications using something like 'react-toastify'.
      });
  };

  return (
    <div>
      <Autocomplete
        fullWidth
        disabled={isLoading}
        options={specialities}
        getOptionLabel={(option) => option.nombre}
        value={selectedSpeciality}
        onChange={(event, newValue) => {
          setSelectedSpeciality(newValue);
          setSelectedDoctor("");
          if (newValue) {
            obtenerDoctoresPorEspecialidad(newValue.nombre);
          } else {
            // Si no se selecciona ninguna especialidad, borra la lista de doctores
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
                {doctor.sexo === "MASCULINO" ? "Dr. " : "Dra. "}
                {doctor.nombres +
                  " " +
                  doctor.apellidoPaterno +
                  " " +
                  doctor.apellidoMaterno}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedDoctor && <Selectdate />}

      {selectedDoctor && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Reservar Cita con {selectedDoctor}
        </Button>
      )}
    </div>
  );
}

export default SeleccionarMedico;
