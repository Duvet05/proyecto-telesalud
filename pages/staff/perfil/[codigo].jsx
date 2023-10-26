import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SeleccionarHorarioMedico from "@/components/Staff/SeleccionarHorarioMedico";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { medicService } from "@/services/medicService";
import DatosMedico from "@/components/Staff/DatosMedico";
import MainLayout from "@/components/layout/MainLayout";

const PerfilMedico = () => {
  const router = useRouter();
  const { codigo } = router.query; // Cambiado 'idPersona' por 'codigo'
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (codigo) {
      fetchDoctor(codigo); // Cambiado 'idPersona' por 'codigo'
    }
  }, [codigo]);

  const fetchDoctor = async (codigo) => {
    try {
      const data = await medicService.buscarPorNombre(codigo);
      setSelectedDoctor(data);
      setIsLoading(true);
    } catch (error) {
      console.error("Error al buscar el médico:", error);
      setIsLoading(false);
      // Considerar mostrar un mensaje de error al usuario aquí
    }
  };

  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const handleShowAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  if (!isLoading) {
    return <MainLayout>Cargando...</MainLayout>;
  }

  return (
    <MainLayout>
      <div>
        <Grid container justifyContent="center" style={{ height: "auto", marginTop: "10px" }}>
          <Grid item xs={11}>
            <Paper
              elevation={3}
              style={{ padding: "10px 30px 30px 30px", background: "white" }}
            >
              {/* Contenido dentro del Paper */}
              <h1 style={{ fontWeight: "normal", marginBottom: "8px" }}>Perfil del médico</h1>
              <hr />
              <h3 style={{ fontWeight: "normal", marginTop: "8px" }}>Datos personales</h3>
              <br />
              <DatosMedico doctor={selectedDoctor} />
              <h3>Disponibilidad</h3>
              <br />
              
              <SeleccionarHorarioMedico doctor={selectedDoctor} />
              {/* Fin del contenido dentro del Paper */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default PerfilMedico;