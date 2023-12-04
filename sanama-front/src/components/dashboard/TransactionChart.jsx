import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Ene',
		Asistencia: 265,
		Reserva: 269
	},
	{
		name: 'Feb',
		Asistencia: 129,
		Reserva: 145
	},
	{
		name: 'Mar',
		Asistencia: 329,
		Reserva: 335
	},
	{
		name: 'Abr',
		Asistencia: 155,
		Reserva: 160
	},
	{
		name: 'May',
		Asistencia: 190,
		Reserva: 221
	},
	{
		name: 'Jun',
		Asistencia: 421,
		Reserva: 444
	},
	{
		name: 'Jul',
		Asistencia: 602,
		Reserva: 615
	},
	{
		name: 'Ago',
		Asistencia: 459,
		Reserva: 481
	},
	{
		name: 'Sep',
		Asistencia: 912,
		Reserva: 915
	},
	{
		name: 'Oct',
		Asistencia: 265,
		Reserva: 301
	},
	{
		name: 'Nov',
		Asistencia: 264,
		Reserva: 281
	},
	{
		name: 'Dic',
		Asistencia: 299,
		Reserva: 300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Distribución de reserva y asistencia a citas</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Reserva" fill="#0ea5e9" />
						<Bar dataKey="Asistencia" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
