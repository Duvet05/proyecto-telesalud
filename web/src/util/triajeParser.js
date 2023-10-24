// {
//     "idTriaje": 2,
//     "codigoTriaje": "TR-20230831-113512",
//     "peso": 80,
//     "talla": 175,
//     "temperatura": 37,
//     "motivoVisita": "Dolor de cabeza",
//     "presionArterial": 120,
//     "estado": 1,
//     "prioridad": "Media",
//     "fechaTriaje": "2022-12-18",
//     "horaTriaje": "14:32:51",
//     "saturacionOxigeno": "98",
//     "frecuenciaCardiaca": "75",
//     "nivelConciencia": "Consciente",
//     "nivelDolor": "Leve",
//     "condicionesPrexistentes": "Ninguna",
//     "paciente": {
//         "idPersona": 0,
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//         "fechaNacimiento": "1990-09-27",
//         "sexo": "MASCULINO"
//     }
// },
// {
//     "idTriaje": 3,
//     "estado": 4,
//     "prioridad": "1",
//     "fechaTriaje": "2022-11-28",
//     "paciente": {
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//     }
// }
// ]

export function parseTriajeTable(data) {
    const table = data.map( row => [
            { "data": row["idTriaje"] }, //ID
            { "data": row["fechaTriaje"] }, // Fecha de Triaje <- en formato del orto
            { "data": `${row["paciente"]["nombres"]} ${row["paciente"]["apellidoPaterno"]} ${row["paciente"]["apellidoMaterno"]}` }, // Nombre completo
            { "data": row["paciente"]["dni"] }, // DNI del paciente
            { "data": row["estado"] === 0 ? "Inactivo" : "Activo" }, // Estado 
            { "data": row["prioridad"] } // Urgencia
        ]
    )
    console.log(table)
    return table;
}

// export function parseTriajeTable(data) {
//     const columns = ["idPersona", "paciente", "fecha", "estado", "urgencia"]
//     const table = data.map(row => {
//         return columns.map(column => {
//             if (column === "nombres") {
//                 return {
//                     "data": `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`
//                 }
//             } else if (column === "especialidad") {
//                 return { "data": row["especialidad"]["nombre"] }
//             }
//             else {
//                 return { "data": row[column] }
//             }
//         })
//     })

//     return table;
// }