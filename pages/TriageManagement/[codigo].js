import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MainLayout from "@/components/layout/MainLayout";
import { triajeService } from "@/services/triajeService";
import { useRouter } from 'next/router';

const DetalleTriaje = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTriaje, setSelectedTriaje] = useState(null);
  
    useEffect(() => {
      if (id) {
        fetchTriaje(id);
      }
    }, [id]);
  
    const fetchTriaje = async (id) => {
      try {
        const data = await triajeService.buscarTriajePorId(id); 
        
        setSelectedTriaje(data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error al buscar los datos de triaje:", error);
        setIsLoading(false);
      }
    };

    if (!isLoading) {
        return <MainLayout>Cargando...</MainLayout>;
    }

    return (
        <MainLayout>
        <div>
            <Grid container justifyContent="center" style={{ height: "auto", marginTop: "10px" }}>
            <Grid item xs={11}>
                <Paper elevation={3} style={{ padding: "10px 30px 30px 30px", background: "white" }}>
                <h1 style={{ fontWeight: "normal", marginBottom: "8px" }}>Detalles de Triaje</h1>
                <hr />                
                {triages.map(triaje => (
                    <div key={triaje.idTriaje}>
                    <h3 style={{ fontWeight: "normal", marginTop: "8px" }}>Datos de Triaje {triaje.codigoTriaje}</h3>
                    <p><strong>Peso:</strong> {triaje.peso}kg</p>
                    <p><strong>Talla:</strong> {triaje.talla}cm</p>
                    <p><strong>Temperatura:</strong> {triaje.temperatura}°C</p>
                    <p><strong>Motivo Visita:</strong> {triaje.motivoVisita}</p>
                    <p><strong>Presión Arterial:</strong> {triaje.presionArterial}</p>
                    <p><strong>Estado:</strong> {triaje.estado}</p>
                    <p><strong>Prioridad:</strong> {triaje.prioridad}</p>
                    <p><strong>Fecha Triaje:</strong> {triaje.fechaTriaje}</p>
                    <p><strong>Hora Triaje:</strong> {triaje.horaTriaje}</p>
                    <p><strong>Saturación Oxígeno:</strong> {triaje.saturacionOxigeno}</p>
                    <p><strong>Frecuencia Cardiaca:</strong> {triaje.frecuenciaCardiaca}</p>
                    <p><strong>Nivel Conciencia:</strong> {triaje.nivelConciencia}</p>
                    <p><strong>Nivel Dolor:</strong> {triaje.nivelDolor}</p>
                    <p><strong>Condiciones Preexistentes:</strong> {triaje.condicionesPrexistentes}</p>
                    <h4>Datos del paciente</h4>
                    <p><strong>Nombres:</strong> {triaje.paciente.nombres}</p>
                    <p><strong>Apellido Paterno:</strong> {triaje.paciente.apellidoPaterno}</p>
                    <p><strong>Apellido Materno:</strong> {triaje.paciente.apellidoMaterno}</p>
                    <p><strong>DNI:</strong> {triaje.paciente.dni}</p>
                    <p><strong>Fecha Nacimiento:</strong> {triaje.paciente.fechaNacimiento}</p>
                    <p><strong>Sexo:</strong> {triaje.paciente.sexo}</p>
                    <hr />
                    </div>
                ))}
                </Paper>
            </Grid>
            </Grid>
        </div>
        </MainLayout>
    );
};

export default DetalleTriaje;
