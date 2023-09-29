import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button as MUIButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "react-bootstrap"; // Consider using only one library for buttons
import DoctorTable from "../../components/doctor/DoctorTable";


const StaffPage = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Doctores
      </Typography>

      <Paper sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <TextField label="Buscar por nombre o dni" fullWidth />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              label="Ultima visita"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </Grid>

          <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MUIButton variant="contained" size="large">
              Buscar
            </MUIButton>
          </Grid>
        </Grid>
      </Paper>

      <DoctorTable />
    </div>
  );
};

export default StaffPage;