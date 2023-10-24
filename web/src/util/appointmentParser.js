// {
//     "idCita": 3,
//     "paciente": {
//         "idPersona": 23,
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//         "fechaNacimiento": null,
//         "sexo": null,
//         "telefono": null,
//         "correoElectronico": null,
//         "foto": null,
//         "estado": 0,
//         "codigoSeguro": null,
//         "tipoSeguro": null,
//         "tieneAcompanhante": false,
//         "nombreAcompnhante": null,
//         "dniAcompanhante": null,
//         "correo": null,
//         "direccion": null,
//         "parentezco": null,
//         "historialClinico": null,
//         "programacionesCitas": null
//     },
//     "medico": {
//         "idPersona": 1,
//         "nombres": "Marcos",
//         "apellidoPaterno": "Salute",
//         "apellidoMaterno": "Segura",
//         "dni": null,
//         "fechaNacimiento": null,
//         "sexo": null,
//         "telefono": null,
//         "correoElectronico": null,
//         "foto": null,
//         "estado": 0,
//         "area": null,
//         "cmp": null,
//         "especialidad": {
//             "idEspecialidad": 0,
//             "codigo": null,
//             "nombre": "Cardiología",
//             "descripcion": null,
//             "estado": 0
//         },
//         "horariosAtencion": null
//     },
//     "horaCita": "14:30:00",
//     "fechaCita": "2023-10-23",
//     "lugarCita": null,
//     "tipoCita": null,
//     "codigoCita": "CODIGO_CITA_1",
//     "estadoCita": null,
//     "estado": 4,
//     "triaje": null,
//     "codigoCitaMedica": null,
//     "hojaMedica": {
//         "idHojaClinica": 1,
//         "codigo": null,
//         "fecha": null,
//         "estado": 0,
//         "diagnostico": null,
//         "resultados": null,
//         "recetaMedica": null
//     },
//     "ordenesLaboratorio": null,
//     "requiereTriaje": 0
// },


// let parsedRows = []

// data.foreach(cita=>{
// 	let columns = []
// 	columns.push({data: cita["triaje"]["idTriaje"]})
// 	let nombreCompleto = `$cita["paciente"]["nombre"] $cita["paciente"]["apellidoPaterno"] $cita["paciente"]["apellidoMaterno"]`
// 	columns.push({data: nombreCompleto})
// 	columns.push({data: cita["paciente"]["dni"]})
// 	columns.push({data: cita["triaje"]["estado"]})
// 	columns.push({data: cita["triaje"]["prioridad"]})
// 	let fechaCompleta = `$cita["triaje"]["horaTriaje"] $cita["triaje"]["fechaTriaje"]`
// 	columns.push({data: fechaCompleta)
// 	parsedRows.push(columns)
// }


export function parseAppointmentTable(data) {
    const columns = ["idCita", "paciente", "medico", "especialidad", "fechaCita", "horaCita", "estadoCita"]
    const table = data.map(row => {
        return columns.map(column => {
            if (column === "paciente") {
                return {
                    "data": `${row["paciente"]["nombres"]} ${row["paciente"]["apellidoPaterno"]} ${row["paciente"]["apellidoMaterno"]}`
                }
            } else if (column === "medico") {
                return {
                    "data": `${row["medico"]["nombres"]} ${row["medico"]["apellidoPaterno"]} ${row["medico"]["apellidoMaterno"]}`
                }
            } else if (column === "especialidad") {
                return {
                    "data": row["medico"]["especialidad"]["nombre"]
                }
            } else {
                return { "data": row[column] }
            }
        })
    })
    return table
}