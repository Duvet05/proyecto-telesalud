
import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Fecha" },
    { name: "Nombre completo" },
    { name: "DNI" },
    { name: "Estado" },
    { name: "Urgencia" },
    { name: "Opciones" },
]

const TriajeTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="\triajes\info" />
    )
}

export default TriajeTable