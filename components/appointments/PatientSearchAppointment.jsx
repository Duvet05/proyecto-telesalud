import React, { useState } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function PatientSearchAppointment({
  allPatients,
  onSelect,
  onAdd,
  isEditing,
  disabled,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleAutoCompleteChange = (event, value) => {
    onSelect(value);
    setSelectedValue(value);
  };

  const handleAddOrCancel = () => {
    if (isEditing) {
      onAdd(); // Si está en modo edición, se usa para cancelar
    } else if (inputValue) {
      onAdd(); // Si hay un valor en el campo de búsqueda, se usa para agregar
    }
    setSelectedValue(null);
    setInputValue("");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={9} md={8}>
        <Autocomplete
          options={allPatients}
          getOptionLabel={(option) =>
            `${option.nombres} ${option.apellidoPaterno} ${option.apellidoMaterno}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar por nombre..."
              variant="outlined"
              fullWidth
              disabled={disabled}
              sx={{ width: "92vh" }}
            />
          )}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          value={selectedValue}
          onChange={handleAutoCompleteChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3} md={4}>
        <Tooltip title={isEditing ? "Cancelar" : "Agregar paciente"}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <IconButton onClick={handleAddOrCancel} sx={{ marginRight: 1 }}>
              {isEditing ? <CloseIcon /> : <AddIcon />}
            </IconButton>
            <Typography variant="body2">
              {isEditing ? "Cancelar" : "Agregar paciente"}
            </Typography>
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default PatientSearchAppointment;
