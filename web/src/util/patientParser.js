
// http://localhost:8080/admision/post/buscarPaciente


// [
//     {
//         "idPersona": 23,
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//         "fechaNacimiento": "1990-09-27",
//         "telefono": "937581946",
//          ...
//     }
//      [
//         {"data":23}
//         {"data":"Javier"}
//         {"data":"Mendez"}
//          ...
// ]
// ]
export function parsePatientTable(data) {
    const columns = ["idPersona", "nombres", "dni", "fechaNacimiento", "telefono"]
    const table = data.map(row => {
        return columns.map(column => {
            if (column === "nombres") {
                return {
                    "data": `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`
                }
            } else {
                return { "data": row[column] }
            }
        })
    })
    return table
}
