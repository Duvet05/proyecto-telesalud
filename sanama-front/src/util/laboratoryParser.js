import { format, parseISO } from "date-fns";

const formatFullName = (paciente) =>
  `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`;

const formatDateAndTime = (fecha, hora) => {
  const formattedDate = format(parseISO(fecha), "dd/MM/yyyy");
  const formattedTime = format(parseISO(`1970-01-01T${hora}`), "hh:mm a");
  return `${formattedDate} ${formattedTime}`;
};

export function parseLaboratoryTable(data) {
  return data.map((row) => {
    const paciente = row.citaMedica.paciente;
    const fechaHoraOrden = formatDateAndTime(row.fechaOrden, row.horaOrden);

    return {
      idOrdenLaboratorio: row.idOrdenLaboratorio,
      codigoOrden: row.codigoOrden,
      fechaHoraOrden,
      dniPaciente: paciente.dni,
      nombrePaciente: formatFullName(paciente),
      tipoMuestra: row.tipoMuestra,
      estado: row.estado,
    };
  });
}
