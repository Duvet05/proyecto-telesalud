import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Selectdate from "../../components/patient/Selectdate";

function SeleccionarMedico() {
  const [especialidad, setEspecialidad] = useState("");
  const [medico, setMedico] = useState("");

  const especialidades = ["Cardiología", "Neurología", "Ortopedia"];
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
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Especialidad</InputLabel>
        <Select value={especialidad} onChange={handleEspecialidadChange}>
          {especialidades.map((esp) => (
            <MenuItem key={esp} value={esp}>
              {esp}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {especialidad && (
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Médico</InputLabel>
          <Select
            value={medico}
            onChange={(event) => setMedico(event.target.value)}
          >
            {medicos[especialidad].map((med) => (
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
