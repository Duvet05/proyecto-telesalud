import ActionButton from '@/components/buttons/ActionButton'
import Link from 'next/link'

const PatientActions = ({ id }) => {
	return (
		<section className="my-10 h-[300px] w-[470px] rounded-2xl grid grid-rows-2 items-center bg-white shadow">
			<ActionButton
				url={`/patients/profile/${id}/appointments`}
				color={'bg-orange-400'}
				shadow={'shadow-orange-200'}
				name={'Citas'}
			/>
			<ActionButton
				url={`/patients/profile/${id}/medicalHistory`}
				color={'bg-red-400'}
				shadow={'shadow-red-200'}
				name={'Historial Clínico'}
			/>
		</section>
	)
}

export default PatientActions
