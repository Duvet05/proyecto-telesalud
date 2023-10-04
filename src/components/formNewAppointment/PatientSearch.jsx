import React from "react";
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
  const [inputValue, setInputValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleSelectionChange = (event, value) => {
    onSelect(value);
    setSelectedValue(value); // Set selected value after selection
    setInputValue(""); // Clear input value after selection
  };

  const handleIconButtonClick = () => {
    onAdd();
    setInputValue(""); // Clear input value after clicking the button
    setSelectedValue(null); // Clear selected value after clicking the button
  };

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
              label="NOMBRES O DOCUMENTO DE INDENTIDAD"
              variant="outlined"
              fullWidth
              disabled={disabled}
            />
          )}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={selectedValue} // Use controlled value
          onChange={handleSelectionChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={2} md={4}>
        <Tooltip title={isEditing ? "Cancelar" : "Agregar paciente"}>
          <IconButton onClick={handleIconButtonClick}>
            {isEditing ? <CloseIcon /> : <AddIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default PatientSearch;
