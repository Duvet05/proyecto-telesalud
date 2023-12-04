// useAppointmentData.js
import { useState, useCallback } from "react";
import { appointmentService } from "@/services/appointmentService";
import { parseAppointmentTable } from "@/util/appointmentParser";

export const useAppointmentData = () => {
  const [appointmentTable, setAppointmentTable] = useState([]);

  const fetchData = useCallback(async (request) => {
    try {
      const data = await appointmentService.listarCitasFiltro(request);
      const tableData = parseAppointmentTable(data);
      setAppointmentTable(tableData);
    } catch (error) {
      console.error("Error al obtener la lista de citas", error);
    }
  }, []);

  return { appointmentTable, fetchData };
};
