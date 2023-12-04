import { doctorService } from "@/services/doctorService"
import Link from "next/link"
import { useEffect, useState } from "react"
import { appointmentService } from "@/services/appointmentService"
const LatestAppointmentsDoctor = ({ id }) => {
  console.log("pepepe", id);
  const [latestAppointments, setLatestAppointments] = useState([])

  const fetchData = async ({ pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin, arregloEstados }) => {
    // console.log("datos recibidos",pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,pn_estado)
    try {
      const data = await appointmentService.citasMedicoPorID(pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin, arregloEstados);
      // console.log("citas pendientes", data);
      //   const citasMapeadas = data.map((cita) => ({
      //     ...cita,
      //     idCita: cita.idCita,
      //     codigoCita: cita.codigoCita,
      //     medico: {
      //       nombres: doctor.nombres,
      //       apellidoPaterno: doctor.apellidoPaterno,
      //       apellidoMaterno: doctor.apellidoMaterno,
      //       especialidad: {
      //         nombre: doctor.especialidad.nombre,
      //       },
      //     },
      //   }));
      setLatestAppointments(data);
      console.log("citas AJJA", data)
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
      ]
    })
  }, []);


  return (
    <section className="my-10  p-6 w-full h-full  bg-white border border-gray-200 rounded-xl shadow">
      <div className="px-4 flex items-center justify-between">
        <h1 className="font-bold text-lg pb-1"> Últimas citas realizadas</h1>
        {/* <Link href={`/doctors/profile/${id}/misCitas`}
          className="text-blue-700 hover:text-white border 
                         hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                        dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
          Ver todos
        </Link> */}
      </div>

      <div className="grid grid-cols-2">
        {latestAppointments.length > 0 ? (
          latestAppointments.slice(0, 4).map((appointment, index) => (
            <div key={index} className="p-4 m-4 rounded-lg text-sm border border-gray shadow-sm">
              <p>
                <strong className="text-gray-500 pr-3">Fecha:</strong>
                {appointment.fechaCita}
              </p>
              <p>
                <strong className="text-gray-500 pr-3">Hora:</strong> {appointment.horaCita}
              </p>
              <p>
                <strong className="text-gray-500 pr-3">Paciente:</strong>
                {appointment.paciente.apellidoPaterno + " " + appointment.paciente.apellidoMaterno + ", " + appointment.paciente.nombres}
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
      </div >



    </section >
  )
}

export default LatestAppointmentsDoctor;