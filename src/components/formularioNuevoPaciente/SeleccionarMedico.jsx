import { React, useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Selectdate from "../../components/patient/Selectdate";
import { getSpecialty } from "../../redux/Functions";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function SeleccionarMedico() {
  const [cargando, setCargando] = useState(true);
  const [specialities, setSpecialties] = useState([]);
  const [especialidad, setEspecialidad] = useState("Seleccionar Especialidad"); // Valor inicial
  const [medico, setMedico] = useState("");

  useEffect(() => {
    getSpecialty()
      .then((recibeSpecialties) => {
        setSpecialties(recibeSpecialties);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const medicos = {
    Cardiología: ["Dr. Smith", "Dr. Johnson"],
    Neurología: ["Dr. Williams", "Dr. Jones"],
    Ortopedia: ["Dr. Brown", "Dr. Davis"],
  };

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
    setMedico(""); // Reseteamos el médico al cambiar especialidad
  };

  return (
    <div>
      <Autocomplete
        fullWidth
        options={specialities}
        getOptionLabel={(option) => option.nombre}
        value={especialidad}
        onChange={(event, newValue) => {
          setEspecialidad(newValue);
          setMedico(""); // Reseteamos el médico al cambiar especialidad
        }}
        renderInput={(params) => (
          <TextField {...params} label="Especialidad" variant="outlined" />
        )}
      />

      {especialidad != "Seleccionar Especialidad" && (
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Médico</InputLabel>
          <Select
            value={medico}
            onChange={(event) => setMedico(event.target.value)}
          >
            {medicos[especialidad.nombre]?.map((med) => (
              <MenuItem key={med} value={med}>
                {med}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {medico && <Selectdate />}

      {medico && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Reservar Cita con {medico}
        </Button>
      )}
    </div>
  );
}

export default SeleccionarMedico;
