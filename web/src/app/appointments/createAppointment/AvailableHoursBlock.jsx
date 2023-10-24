import React, { useState, useEffect } from "react";
import { useAppointments } from "@/context/AppointmentsContext";

function AvailableHoursBlock({ availableHours = [], onHourClick }) {
  const { appointmentData, setAppointmentData } = useAppointments();
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    setSelectedHour(null);
  }, [appointmentData.selectedHour]);

  if (availableHours.length === 0) {
    return <div className="w-100 text-center">No hay horarios disponibles</div>;
  }

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    onHourClick(hour);
  };

  return (
    <div className="flex flex-col gap-2 w-100 overflow-y-auto max-h-[250px]">
      {availableHours.map((horario, index) => {
        const { idTurno, horaInicio, horaFin } = horario;
        const horaInicioFormateada = horaInicio.slice(0, 5);
        const horaFinFormateada = horaFin.slice(0, 5);
        const rangoHorario = `${horaInicioFormateada} - ${horaFinFormateada}`;
        const isSelected = horaInicio === selectedHour;

        return (
          <button
            key={idTurno}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isSelected
                ? "bg-blue-500 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleHourClick(horaInicio)}
          >
            {rangoHorario}
          </button>
        );
      })}
    </div>
  );
}

export default AvailableHoursBlock;
