import AdvancedTable from "@/components/table/Table"
import Table from "@/components/table/Table"
import TableOptions from "@/components/table/TableOptions"
import React from "react"

const DoctorTable = ({ data, options, loadingTable }) => {
  const columns = React.useMemo(() => [
    {
      accessorKey: "idPersona",
      header: "ID",
      enableSorting: true,
    },

    {
      accessorKey: "doctorName",
      header: "Nombre completo",
      enableSorting: true,
    },
    {
      accessorKey: "cmp",
      header: "CMP",
      enableSorting: true,
    },
    {
      accessorKey: "specialty",
      header: "Especialidad",
      enableSorting: true,
    },
    {
      accessorKey: "area",
      header: "Area",
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <TableOptions id={row.original.idPersona} options={options} />
        )
      }
    },
  ], []
  )

  return (
    <AdvancedTable
      columns={columns}
      data={data}
      id={"idPersona"}
      options={options}
      loadingTable={loadingTable}
    />
  )
}
export default DoctorTable