import React from "react";
import MedicationTable from "../../components/common/tables/MedicationTable";
import SeleccionarHorarioMedico from "./SeleccionarHorarioMedico"
import { useState } from "react";
import moment from "moment"; // Importa moment
import PerfilMedico from "./PerfilMedico";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'; 
const LaboratoryPage = (props) => {
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const handleShowAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  return (
    <div>
      <Grid container justifyContent="center" style={{ height: '100vh' }}>
        <Grid item xs={11}>
          <Paper elevation={3} style={{ padding: '30px', background: 'white' }}>
            {/* Contenido dentro del Paper */}
            <h1>Componente perfil del médico</h1>
            <hr />
            <h3>Datos personales</h3>
            <PerfilMedico />
            <h3>Disponibilidad</h3>
            <SeleccionarHorarioMedico />
            {/* Fin del contenido dentro del Paper */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LaboratoryPage;
