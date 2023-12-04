export function parseHistorial(data) {
  const columns = ["idHistorialClinico", "codigo", "hojasMedicas"]
  const table = data.map((row) => {
    return columns.map((column) => {
      return { data: row[column] }
    })
  })
  return table
}

export function parseHojaMedicaTable(data) {
  return data.map((row) => ({
    idHojaMedica: row.idHojaMedica,
    historyCode: row.codigo,
    doctorName: row.citaMedica.medico.nombres + " " + row.citaMedica.medico.apellidoPaterno + " " + row.citaMedica.medico.apellidoMaterno,
    specialty: row.citaMedica.medico.especialidad.nombre,
    dateTime: row.fechaAtencion + " " + row.horaAtencion,
  }))
}
