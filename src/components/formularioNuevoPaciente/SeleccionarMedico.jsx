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
import { getSpecialty } from "../../redux/Functions";

function SeleccionarMedico() {
  const [isLoading, setIsLoading] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    getSpecialty()
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

  const doctorsBySpeciality = {
    Cardiología: ["Dr. Smith", "Dr. Johnson"],
    Neurología: ["Dr. Williams", "Dr. Jones"],
    Ortopedia: ["Dr. Brown", "Dr. Davis"],
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
            {doctorsBySpeciality[selectedSpeciality.nombre]?.map((doctor) => (
              <MenuItem key={doctor} value={doctor}>
                {doctor}
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
