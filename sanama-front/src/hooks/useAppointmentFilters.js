// useAppointmentFilters.js
import { useState, useCallback } from "react";
import { format } from "date-fns";

export const useAppointmentFilters = () => {
  const [dateInitial, setDateInitial] = useState(null);
  const [dateFinal, setDateFinal] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(
    "Todas las especialidades"
  );
  const [statusState, setStatusState] = useState({});

  const getFilterRequest = (searchTerm, statusList, specialty) => {
    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, _]) => ({ estado: key }));

    return {
      pn_id_especialidad: specialty ? specialty : null,
      pv_filtro: searchTerm,
      pd_fecha_inicio: dateInitial ? format(dateInitial, "yyyy-MM-dd") : null,
      pd_fecha_fin: dateFinal ? format(dateFinal, "yyyy-MM-dd") : null,
      arregloEstados: stateArray,
    };
  };

  return {
    dateInitial,
    setDateInitial,
    dateFinal,
    setDateFinal,
    especialidadSeleccionada,
    setEspecialidadSeleccionada,
    statusState,
    setStatusState,
    getFilterRequest,
  };
};
