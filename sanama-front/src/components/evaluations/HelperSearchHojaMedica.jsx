import React, { useState } from "react";

const HelperSearchHojaMedica = ({ idpaciente, onSearch }) => {
  const [especialidadId, setEspecialidadId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el envío del formulario y recarga de página
    onSearch({
      pn_id_paciente: idpaciente,
      pn_id_especialidad: especialidadId || null,
      pd_fecha_inicio: fechaInicio || null,
      pd_fecha_fin: fechaFin || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex">
      <div>
        <label
          htmlFor="especialidadId"
          className="block text-sm font-medium text-gray-700"
        >
          ID de Especialidad
        </label>
        <input
          type="text"
          id="especialidadId"
          value={especialidadId}
          onChange={(e) => setEspecialidadId(e.target.value)}
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
          placeholder="Ingrese ID de Especialidad"
        />
      </div>
      <div>
        <label
          htmlFor="fechaInicio"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha de Inicio
        </label>
        <input
          type="date"
          id="fechaInicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label
          htmlFor="fechaFin"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha de Fin
        </label>
        <input
          type="date"
          id="fechaFin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default HelperSearchHojaMedica;
