import { useState, useCallback } from "react";
import { doctorService } from "@/services/doctorService";

function useDoctorAvailability() {
  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableDays = useCallback(async (medicId) => {
    setLoading(true);
    setError(null);
    try {
      const days = await doctorService.DiasDisponiblesByID(medicId);
      setAvailableDays(days);
    } catch (error) {
      console.error("Error al buscar los días disponibles", error);
      setError(
        "No se pudieron cargar los días disponibles. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    availableDays,
    loading,
    error,
    fetchAvailableDays,
  };
}

export default useDoctorAvailability;
