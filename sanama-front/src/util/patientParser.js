export function parsePatientTable(data) {
  return data.map((row) => ({
    idPersona: row.idPersona,
    patientName:
      row.nombres + " " + row.apellidoPaterno + " " + row.apellidoMaterno,
    dni: row.dni,
    correo: row.correo,
    phone: row.telefono,
  }));
}

export function parsePatientModal(data) {
  return data.map((row) => {
    return {
      data: row.idPersona,
      data: `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`,
      data: row.dni,
    };
  });
}

export const sexParser = (sex) => {
  if (sex === "M") {
    return "Masculino";
  } else if (sex === "F") {
    return "Femenino";
  } else {
    // Puedes manejar otros valores o dejarlo como está
    return sex;
  }
};
