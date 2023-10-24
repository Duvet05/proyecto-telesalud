
import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Nombre completo" },
    { name: "DNI" },
    { name: "Fecha de nacimiento" },
    { name: "Telefono" },
    { name: "Opciones" },
]

const PatientTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/patients/profile" />
    )
}

export default PatientTable