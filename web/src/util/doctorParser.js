
// http://localhost:8080/rrhh/post/buscarMedico

// {
//     "idPersona": 13,
//     "nombres": "Enrique",
//     "apellidoPaterno": "Erazo",
//     "apellidoMaterno": "Espinoza",
//     "dni": "74032409",
//     "fechaNacimiento": "1998-09-10",
//     "sexo": "M",
//     "telefono": "984234210",
//     "correoElectronico": "enrique@erazo.com",
//     "foto": null,
//     "estado": 1,
//     "area": "Atencion Medica",
//     "cmp": "12345678",
//     "especialidad": {
//         "idEspecialidad": 6,
//         "codigo": null,
//         "nombre": "Oftalmología",
//         "descripcion": null,
//         "estado": 0
//     },
//     "horariosAtencion": null
// },

export function parseDoctorsTable(data) {
    const columns = ["idPersona", "nombres", "cmp", "especialidad", "area"]
    const table = data.map(row => {
        return columns.map(column => {
            if (column === "nombres") {
                return {
                    "data": `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`
                }
            } else if (column === "especialidad") {
                return { "data": row["especialidad"]["nombre"] }
            }
            else {
                return { "data": row[column] }
            }
        })
    })
    return table
}
