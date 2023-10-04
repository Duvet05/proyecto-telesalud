import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close"; // 1. Importar el ícono Close

import PatientFields from "./PatientFields";
import CompanionFields from "./CompanionFields";

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
}));

function PatientInfo() {
  const [hasCompanion, setHasCompanion] = useState("no");
  const [isEditing, setIsEditing] = useState(false); // 2. Agregar estado isEditing

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Busqueda de Paciente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="NOMBRES O DOCUMENTO DE INDENTIDAD"
            variant="outlined"
            required
            fullWidth
            disabled={!isEditing} // Deshabilitar basado en isEditing
            InputProps={{
              endAdornment: (
                <>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                  <IconButton onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <CloseIcon /> : <PersonAddIcon />}{" "}
                    {/* 3. Cambiar ícono basado en isEditing */}
                  </IconButton>
                </>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <PatientFields isDisabled={!isEditing} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            ¿El paciente tiene un acompañante?
          </Typography>
          <RadioGroup
            row
            value={hasCompanion}
            onChange={(e) => setHasCompanion(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        {hasCompanion === "yes" && (
          <Grid item xs={12}>
            <CompanionFields />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default PatientInfo;
