export function parseDoctorsDropdown(data) {
  const table = data.map((row) => {
    return {
      nombreCompleto: `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`,
      idPersona: row["idPersona"],
    };
  });
  return table;
}
const formatFullName = ({ nombres, apellidoPaterno, apellidoMaterno }) =>
  `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;

export function parseDoctorsTable(data) {
  return data.map((row) => ({
    idPersona: row.idPersona,
    doctorName:
      row.nombres + " " + row.apellidoPaterno + " " + row.apellidoMaterno,
    cmp: row.cmp,
    specialty: row.especialidad.nombre,
    area: row.area,
  }));
}
