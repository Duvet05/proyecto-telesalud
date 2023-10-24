//Tabla de citas

import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Nombre del paciente" },
    { name: "Nombre del doctor" },
    { name: "Fecha" },
    { name: "Hora" },
    { name: "Estado" },
    { name: "Opciones" },
]

const AppointmentTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} />
    )
}

export default AppointmentTable 