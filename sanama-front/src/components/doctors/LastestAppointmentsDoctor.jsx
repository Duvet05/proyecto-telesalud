import { useEffect, useState } from "react";
import { appointmentService } from "@/services/appointmentService";

const LatestAppointmentsDoctor = ({ id }) => {
  const [latestAppointments, setLatestAppointments] = useState([]);
  const fetchData = async ({
    pn_id_medico,
    pv_filtro,
    pd_fecha_inicio,
    pd_fecha_fin,
    arregloEstados,
  }) => {
    try {
      const data = await appointmentService.citasMedicoPorID(
        pn_id_medico,
        pv_filtro,
        pd_fecha_inicio,
        pd_fecha_fin,
        arregloEstados
      );
      setLatestAppointments(data);
      console.log("citas AJJA", data);
    } catch (error) {
      console.log("No se pudo obtener la lista de las citas");
    }
  };
  useEffect(() => {
    fetchData({
      pn_id_medico: id,
      pv_filtro: "",
      pd_fecha_inicio: null,
      pd_fecha_fin: null,
      arregloEstados: [
        {
          estado: null,
        },
      ],
    });
  }, []);

  return (
    <section className="my-10  p-6 w-full h-full  bg-white border border-gray-200 rounded-xl shadow">
      <div className="px-4 flex items-center justify-between">
        <h1 className="font-bold text-lg pb-1"> Últimas citas realizadas</h1>
      </div>

      <div className="grid grid-cols-2">
        {latestAppointments.length > 0 ? (
          latestAppointments.slice(0, 4).map((appointment, index) => (
            <div
              key={index}
              className="p-4 m-4 rounded-lg text-sm border border-gray shadow-sm"
            >
              <p>
                <strong className="text-gray-500 pr-3">Fecha:</strong>
                {appointment.fechaCita}
              </p>
              <p>
                <strong className="text-gray-500 pr-3">Hora:</strong>{" "}
                {appointment.horaCita}
              </p>
              <p>
                <strong className="text-gray-500 pr-3">Paciente:</strong>
                {appointment.paciente.apellidoPaterno +
                  " " +
                  appointment.paciente.apellidoMaterno +
                  ", " +
                  appointment.paciente.nombres}
              </p>
              <p>
                <strong className="text-gray-500 pr-3">Estado:</strong>
                {appointment.estado === 1
                  ? "Atendida"
                  : appointment.estado === 2
                  ? "En Consultorio"
                  : appointment.estado === 3
                  ? "Cancelada"
                  : appointment.estado === 4
                  ? "Pendiente"
                  : appointment.estado === 5
                  ? "En Triaje"
                  : "Estado Desconocido"}
              </p>
            </div>
          ))
        ) : (
          <p className="p-4">No hay citas existentes</p>
        )}
      </div>
    </section>
  );
};

export default LatestAppointmentsDoctor;
