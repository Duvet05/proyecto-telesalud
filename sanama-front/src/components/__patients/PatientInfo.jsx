'use client'

import { sexParser } from '@/util/patientParser'

const PatientInfo = ({ gender, dni, dateofbirth, patientState, insuranceCode, insuranceType }) => {
	return (
		<section className="my-10 block p-4 h-[300px] sm:w-full md:w-full lg:w-full bg-white border border-gray-200 rounded-2xl shadow">
			<header className="p-5 text-xl font-bold tracking-wider text-gray-900">Información personal</header>

			<section className="flex text-large pt-4 text-gray-700">
				<dl className="basis-1/3">
					<dt className="text-sm px-5">Género</dt>
					<dd className="text-lg font-bold px-5 pb-10"> {sexParser(gender)}</dd>

					<dt className="text-sm px-5 ">DNI</dt>
					<dd className="text-lg font-bold px-5 ">{dni}</dd>
				</dl>

				<dl className="basis-1/3">
					<dt className="text-sm px-5 ">Código de seguro</dt>
					<dd className="text-lg font-bold px-5 pb-10">{insuranceCode}</dd>

					<dt className="text-sm px-5 ">Tipo de seguro</dt>
					<dd className="text-lg font-bold px-5 ">{insuranceType}</dd>
				</dl>

				<dl className="basis-1/3">
					<dt className="text-sm px-5">Fecha de nacimiento</dt>
					<dd className="text-lg font-bold px-5">{dateofbirth}</dd>
				</dl>
			</section>
		</section>
	)
}

export default PatientInfo
