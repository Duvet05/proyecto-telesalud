import { useState, useEffect, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { doctorService } from "@/services/doctorService";

export function useAvailableDays(medicId) {
  const [highlightedDays, setHighlightedDays] = useState([]);

  const fetchAvailableDays = useCallback(async () => {
    try {
      const data = await doctorService.DiasDisponiblesByID(medicId);
      setHighlightedDays(data.map((date) => dayjs(date).format("YYYY-MM-DD")));
    } catch (error) {
      console.error("Error fetching available days:", error);
    }
  }, [medicId]);

  useEffect(() => {
    if (medicId) fetchAvailableDays();
  }, [medicId, fetchAvailableDays]);

  return highlightedDays;
}

export function useAvailableHours(selectedDate, medicId) {
  const [availableHours, setAvailableHours] = useState([]);

  const fetchAvailableHours = useCallback(
    async (fecha) => {
      try {
        const data = await doctorService.buscarHorariosMedicoFecha(
          fecha,
          medicId
        );
        setAvailableHours(data);
      } catch (error) {
        console.error("Error fetching available hours:", error);
      }
    },
    [medicId]
  );

  useEffect(() => {
    if (selectedDate) fetchAvailableHours(selectedDate);
  }, [selectedDate, fetchAvailableHours]);

  return availableHours;
}
