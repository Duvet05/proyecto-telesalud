import { patientService } from '@/services/patientService'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const LatestAppointments = ({ id }) => {
	const [latestAppointments, setLatestAppointments] = useState([])

	const fetchLatestAppointments = async () => {
		try {
			const data = await patientService.listarCitasPorPaciente(id)
			console.log(data)
			setLatestAppointments(data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchLatestAppointments()
	}, [])

	return (
		<section className=" h-[300px] p-10 w-full bg-white border border-gray-200 rounded-xl shadow  ">
			<div className="flex justify-between mb-10">
				<h1 className="font-bold text-lg "> Últimas citas realizadas</h1>
				<div className="px-4 flex items-center justify-between  ">
					<Link
						href={`/patients/profile/${id}/appointments`}
						className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-500 flex justify-end">
						Ver todos
					</Link>
				</div>
			</div>

			<div className=" grid grid-cols-3 gap-4">
				{latestAppointments.slice(0, 3).map((appointment, index) => (
					<div key={index} className="p-4 rounded-lg text-md border border-gray shadow-sm">
						<div className="flex justify-between">
							<span className="text-gray-500 font-semibold">Fecha:</span>
							<span>{appointment.fechaCita}</span>
						</div>
						<div className="flex justify-between">
							<strong className="text-gray-500 font-semibold">Hora:</strong> {appointment.horaCita}
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 font-semibold">Médico:</span>{' '}
							<span>
								{`${appointment.medico.nombres} ${appointment.medico.apellidoPaterno} ${appointment.medico.apellidoMaterno}`}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-500 font-semibold">Especialidad:</span>
							<span>{appointment.medico.especialidad.nombre}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default LatestAppointments
