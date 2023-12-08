import React from 'react'
import { getStatus } from '@/util/status'
import AdvancedTable from '@/components/table/Table'

const PatientAppointmentTable = ({ data, options, loadingTable }) => {
	const columns = React.useMemo(
		() => [
			{
				accessorKey: 'idCita',
				header: 'ID',
				enableSorting: true
			},

			{
				accessorKey: 'nombreDoctor',
				header: 'Nombre del doctor',
				enableSorting: true,
				width: 240
			},
			{
				accessorKey: 'especialidad',
				header: 'Especialidad',
				enableSorting: true,
				width: 240
			},
			{
				accessorKey: 'fechaHora',
				header: 'Fecha y hora',
				enableSorting: true,
				width: 240
			},
			{
				accessorKey: 'estado',
				header: 'Estado',
				enableSorting: true,
				width: 240,
				cell: ({ row }) => {
					const estadoObtenido = getStatus(row.original.estado)
					return (
						<span className={`${estadoObtenido.className}  inline-block text-center w-[120px]`}>
							{estadoObtenido.text}
						</span>
					)
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

export default PatientAppointmentTable
