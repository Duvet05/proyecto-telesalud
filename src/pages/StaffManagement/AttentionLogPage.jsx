import React, { useState } from "react";

const AttentionLogPage = () => {
  const [citas, setCitas] = useState([
    // ejemplo de estructura de citas
    {
      id: 1,
      paciente: "Juan Pérez",
      medico: "Dr. García",
      fecha: "2023-09-29",
      hora: "15:00",
      estado: "pendiente",
    },
    // ... más citas
  ]);
  const [filtro, setFiltro] = useState("");

  const handleAtenderCita = (id) => {
    // Aquí manejamos lo que sucede al atender una cita
  };

  const handleVerDetalle = (id) => {
    // Aquí manejamos lo que sucede al ver el detalle
  };

  const citasFiltradas = citas.filter((cita) => {
    return cita.paciente.includes(filtro) || cita.medico.includes(filtro);
  });

  return (
    <div>
      <h2>Administrador de Citas Médicas</h2>
      <button onClick={() => /* abrir formulario de nueva cita */ {}}>
        Crear Cita
      </button>

      <input
        type="text"
        placeholder="Filtrar citas"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citasFiltradas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.paciente}</td>
              <td>{cita.medico}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
              <td>
                <button onClick={() => handleVerDetalle(cita.id)}>Detalles</button>
                <button onClick={() => handleAtenderCita(cita.id)}>Atender</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttentionLogPage;
