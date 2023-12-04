import React from 'react'
import TableOptions from '../table/TableOptions'
import AdvancedTable from '../table/Table'
import { getStatus } from '@/util/status'

const AppointmentTable = ({ data, options, loadingTable }) => {
	const columns = React.useMemo(
		() => [
			{
				accessorKey: 'idCita',
				header: 'ID',
				enableSorting: true
			},
			{
				accessorKey: 'codigo',
				header: 'Código',
				enableSorting: true,
				width: 120
			},
			{
				accessorKey: 'date',
				header: 'Fecha y hora',
				enableSorting: true,
				width: 160
			},
			{
				accessorKey: 'patientName',
				header: 'Paciente',
				enableSorting: true,
				width: 240
			},
			{
				accessorKey: 'doctorName',
				header: 'Doctor',
				enableSorting: true,
				width: 240
			},
			{
				accessorKey: 'specialty',
				header: 'Especialidad',
				enableSorting: true,
				width: 150
			},
			{
				accessorKey: 'status',
				header: 'Estado',
				enableSorting: true,
				width: 150,
				cell: ({ row }) => {
					const estadoObtenido = getStatus(row.original.status)
					return <span className={`${estadoObtenido.className}  inline-block text-center w-[120px]`}>{estadoObtenido.text}</span>
				}
			},
			{
				id: 'expander',
				header: 'Acciones',
				cell: ({ row }) => {
					return <TableOptions id={row.original.idCita} options={options} />
				}
			}
		],
		[]
	)

	return (
		<div className="">
			<AdvancedTable columns={columns} data={data} id={'idCita'} loadingTable={loadingTable} />
		</div>
	)
}

export default AppointmentTable
