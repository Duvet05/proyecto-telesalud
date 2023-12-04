import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function AvailableHoursBlock({
  availableHours = [],
  onHourClick,
  selectedHour,
}) {
  useEffect(() => {
    if (availableHours.length > 0 && !selectedHour) {
      onHourClick(availableHours[0].horaInicio);
    }
  }, [availableHours, selectedHour, onHourClick]);

  const formattedHours = useMemo(
    () =>
      (Array.isArray(availableHours) ? availableHours : []).map((horario) => {
        const horaInicioFormateada = horario.horaInicio.slice(0, 5);
        return {
          ...horario,
          rangoHorario: `${horaInicioFormateada}`,
        };
      }),
    [availableHours]
  );

  return (
    <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-[250px] mt-2 overflow-x-hidden">
      {formattedHours.map((horario, index) => (
        <motion.div
          key={horario.idTurno}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            onClick={() => onHourClick(horario.horaInicio)}
            className={`px-4 py-2 text-sm w-full border rounded-md transition-all ${
              selectedHour === horario.horaInicio
                ? "bg-orange-500 text-white"
                : "bg-[#e2e7eb] text-[#4f4f4f]"
            }`}
          >
            {horario.rangoHorario}
          </button>
        </motion.div>
      ))}
    </div>
  );
}

AvailableHoursBlock.propTypes = {
  availableHours: PropTypes.arrayOf(
    PropTypes.shape({
      idTurno: PropTypes.number.isRequired,
      horaInicio: PropTypes.string.isRequired,
      horaFin: PropTypes.string.isRequired,
    })
  ).isRequired,
  onHourClick: PropTypes.func.isRequired,
  selectedHour: PropTypes.string,
  isLoading: PropTypes.bool,
};

AvailableHoursBlock.defaultProps = {
  isLoading: false,
};

export default AvailableHoursBlock;
