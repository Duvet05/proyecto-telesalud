
import AdvancedTable from "@/components/table/Table"
import TableOptions from "@/components/table/TableOptions"
import { getPriority, getTriajeStatus, priorityMapping } from "@/util/triajeParser"
import React from "react"

const TriajeTable = ({ data, options, loadingTable }) => {

    const columns = React.useMemo(() => [
        {
            accessorKey: "idTriaje",
            header: "ID",
            enableSorting: true,
        },

        {
            accessorKey: "codigoTriaje",
            header: "Código de triaje",
            enableSorting: true,
        },
        {
            accessorKey: "fechaHoraActualizacion",
            header: "Fecha y hora",
            enableSorting: true,
        },
        {
            accessorKey: "dni",
            header: "DNI",
            enableSorting: true,
        },
        {
            accessorKey: "nombreCompleto",
            header: "Nombre completo",
            enableSorting: true,
        },

        {
            accessorKey: "prioridad",
            header: "Prioridad",
            enableSorting: true,
            cell: ({ row }) => {
                console.log(row.original.prioridad)
                return (
                    <span>
                        {getPriority(row.original.prioridad).icon} {row.original.prioridad}
                    </span>
                )
            }
        },
        {
            accessorKey: "estado",
            header: "Estado",
            enableSorting: true,
            cell: ({ row }) => {
                const estadoObtenido = getTriajeStatus(row.original.estado)
                return (
                    <span className={`${estadoObtenido.className}`}>
                        {estadoObtenido.text}
                    </span>
                )
            },
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                return (
                    <TableOptions id={row.original.idTriaje} options={options} />
                )
            }
        },
    ], [])

    return (
        <div>
            <AdvancedTable columns={columns} data={data} id={"idTriaje"} loadingTable={loadingTable} />
        </div>
    )
}

export default TriajeTable