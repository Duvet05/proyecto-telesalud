import React, { useState } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function PatientSearch({ allPatients, onSelect, onAdd, isEditing, disabled }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleAutoCompleteChange = (event, value) => {
    onSelect(value);
    setSelectedValue(value);
  };

  const handleAddOrCancel = () => {
    onAdd();
    setSelectedValue(null);
    setInputValue("");
  };

  const isAddMode = !selectedValue && inputValue !== "";
  return (
    <Grid container spacing={3}>
      <Grid item xs={10} md={8}>
        <Autocomplete
          options={allPatients}
          getOptionLabel={(option) =>
            `${option.nombres} ${option.apellidoPaterno} ${option.apellidoMaterno}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar por Nombre del Paciente"
              variant="outlined"
              fullWidth
              disabled={disabled}
            />
          )}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          value={selectedValue}
          onChange={handleAutoCompleteChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={2} md={4}>
        <Tooltip
          title={
            isAddMode
              ? "Agregar paciente"
              : isEditing
              ? "Cancelar"
              : "Crear paciente"
          }
        >
          <IconButton onClick={handleAddOrCancel}>
            {isAddMode ? <AddIcon /> : isEditing ? <CloseIcon /> : <AddIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default PatientSearch;
