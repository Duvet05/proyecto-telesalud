'use client'

import PatientActions from '@/components/__patients/PatientActions'
import PatientInfo from '@/components/__patients/PatientInfo'
import ProfileCard from '@/components/cards/ProfileCard'
import { useRouter, usePathname } from 'next/navigation'
import { patientService } from '@/services/patientService'
import { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import LatestAppointments from '@/components/__patients/LatestAppointments'

const PatientProfile = ({ params }) => {
	const router = useRouter()
	const [dataPatient, setDataPatient] = useState({
		nombres: '',
		apellidoPaterno: '',
		apellidoMaterno: '',
		correo: '',
		telefono: '',
		direccion: '',
		sexo: '',
		dni: '',
		fechaNacimiento: '',
		codigoSeguro: '',
		tipoSeguro: ''
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await patientService.buscarPorFiltro(params.idPatient)
				const patient = data[0]
				setDataPatient({
					nombres: patient.nombres,
					apellidoPaterno: patient.apellidoPaterno,
					apellidoMaterno: patient.apellidoMaterno,
					correo: patient.correo,
					telefono: patient.telefono,
					direccion: patient.direccion,
					sexo: patient.sexo,
					dni: patient.dni,
					fechaNacimiento: patient.fechaNacimiento,
					codigoSeguro: patient.codigoSeguro,
					tipoSeguro: patient.tipoSeguro
				})
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [params.idPatient])

	return (
		<div className="w-full px-14 py-6">
			<div className="flex justify-start">
				<button
					type="button"
					className="text-black hover:bg-gray-300 hover:underline font-medium rounded-lg text-sm px-2 py-2 flex items-center"
					onClick={() => router.back()}>
					<MdArrowBack className="mr-2 h-5 w-5" />
					Volver
				</button>
			</div>

			<article className="flex flex-row  justify-center">
				<section className=" w-1/3 ">
					<ProfileCard
						name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
						email={dataPatient.correo}
						phone={dataPatient.telefono}
						address={dataPatient.direccion}
						id={params.idPatient}
						module={'patients'}
						urlEdit={'editPatientData'}
					/>
					<PatientActions id={params.idPatient} />
				</section>

				<section className=" w-2/3 ">
					<PatientInfo
						gender={dataPatient.sexo}
						dni={dataPatient.dni}
						dateofbirth={dataPatient.fechaNacimiento}
						patientState={dataPatient.estado}
						insuranceCode={dataPatient.codigoSeguro}
						insuranceType={dataPatient.tipoSeguro}
					/>
					<LatestAppointments id={params.idPatient} />
				</section>
			</article>
		</div>
	)
}

export default PatientProfile
