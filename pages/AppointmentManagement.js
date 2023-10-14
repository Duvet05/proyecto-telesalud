import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import { appointmentService } from "@/services/appointmentService";
import AppointmentsTable from "../components/appointments/AppointmentsTable";
import SearchAndAddBar from "@/components/common/SearchAndAddBar";

function AppointmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    appointmentService
      .listar()
      .then((data) => {
        const mappedData = mapDataToAppointments(data);
        setAppointments(mappedData);
        setIsLoading(false); // Datos cargados
      })
      .catch((err) => {
        console.error("Error al obtener las citas:", err);
        setError("Hubo un problema al cargar las citas."); // Error seteado
        setIsLoading(false);
      });
  }, []);

  const mapDataToAppointments = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((appointment) => ({
      id: appointment.idCita,
      patientName: `${appointment.paciente.nombres} ${appointment.paciente.apellidoPaterno} ${appointment.paciente.apellidoMaterno}`,
      doctorName: `${appointment.medico.nombres} ${appointment.medico.apellidoPaterno} ${appointment.medico.apellidoMaterno}`,
      speciality: appointment.medico.especialidad.nombre,
      date: appointment.fechaCita,
      time: appointment.horaCita,
      status: appointment.estado === 1 ? "Activo" : "Inactivo",
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          sx={{ color: "#000", marginBottom: "15px", marginTop: "-70px" }}
        >
          Citas
        </Typography>

        {isLoading ? (
          <div>Cargando...</div> // Feedback visual durante carga
        ) : error ? (
          <div>{error}</div> // Mensaje de error
        ) : (
          <>
            <SearchAndAddBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            <AppointmentsTable appointments={filteredAppointments} />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default AppointmentManagement;
