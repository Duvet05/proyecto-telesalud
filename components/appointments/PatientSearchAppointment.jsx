import React, { useState } from "react";
import { Box, TextField, Autocomplete, Button, Tooltip } from "@mui/material";
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
    if (!value) {
      setInputValue("");
    }
  };

  const handleAddOrCancel = () => {
    onAdd();
    setSelectedValue(null);
    setInputValue("");
  };

  const isAddMode = !selectedValue && inputValue !== "";

  let icon = <AddIcon />;
  let label = "Agregar paciente";
  let color = "primary";

  if (isEditing) {
    icon = <CloseIcon />;
    label = "Cancelar";
    color = "error";
  } else if (isAddMode) {
    label = "Agregar";
    color = "primary";
  }

  const isButtonDisabled = selectedValue || inputValue;

  return (
    <Box display="flex" alignItems="center">
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
            sx={{ flex: 1, width: "100vh", marginRight: 2 }} // Use flex to make it responsive
          />
        )}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        value={selectedValue}
        onChange={handleAutoCompleteChange}
        disabled={disabled}
      />
      <Tooltip title={label}>
        <Button
          color={color}
          onClick={handleAddOrCancel}
          variant="contained"
          startIcon={icon}
          disabled={isButtonDisabled}
          sx={{ height: "56px", width: "250px" }}
        >
          {label}
        </Button>
      </Tooltip>
    </Box>
  );
}

export default PatientSearchAppointment;
