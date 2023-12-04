"use client";

import { useState } from "react";
import { appointmentService } from "@/services/appointmentService";

function useAppointmentReschedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const updateAppointmentSchedule = async (appointmentId, newDate, newHour) => {
    setLoading(true);
    setError(null);
    try {
      await appointmentService.actualizarHoraFecha({
        pn_id_cita: appointmentId,
        pd_fecha_cita: newDate,
        pt_hora_cita: newHour,
      });
      setIsStatusUpdated(true);
      setConfirmationMessage(
        "El horario de la cita se ha actualizado exitosamente."
      );
    } catch (error) {
      console.error("Error al actualizar el horario de la cita:", error);
      setError(
        "No se pudo actualizar el horario de la cita. Por favor, intente nuevamente."
      );
      setIsStatusUpdated(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isStatusUpdated,
    confirmationMessage,
    updateAppointmentSchedule,
  };
}

export default useAppointmentReschedule;
