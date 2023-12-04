import { format, parse, parseISO } from "date-fns"

const formatFullName = ({ nombres, apellidoPaterno, apellidoMaterno }) =>
  `${nombres} ${apellidoPaterno} ${apellidoMaterno}`

const formatDateAndTime = (fechaCita, horaCita) => {
  const formattedDate = format(parseISO(fechaCita), "dd/MM/yyyy")
  const formattedTime = format(
    parse(horaCita, "HH:mm:ss", new Date()),
    " HH:mm"
  )
  return `${formattedDate} ${formattedTime}`
}

// export function parsePatientAppointmentTable(data) {
//   return data.map((row) => {
//     const { text: estadoTexto, className: estadoClase } = getStatus(row.estado);
//     return [
//       { data: row.idCita },
//       { data: formatFullName(row.medico) },
//       { data: row.medico.especialidad.nombre },
//       { data: formatDateAndTime(row.fechaCita, row.horaCita) },
//       { data: estadoTexto, className: estadoClase },
//     ];
//   });
// }

export function parsePatientAppointmentTable(data) {
  return data.map((row) => ({
    idCita: row.idCita,
    nombreDoctor: formatFullName(row.medico),
    especialidad: row.medico.especialidad.nombre,
    fechaHora: formatDateAndTime(row.fechaCita, row.horaCita),
    estado: row.estado,
  }))
}

export function parseAppointmentTable(data) {
  return data.map((row) => ({
    idCita: row.idCita,
    codigo: row.codigoCita,
    date: formatDateAndTime(row.fechaCita, row.horaCita),
    patientName: formatFullName(row.paciente),
    doctorName: formatFullName(row.medico),
    specialty: row.medico.especialidad.nombre,
    status: row.estado,
  }))
}
