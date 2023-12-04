'use client'
import { useEffect, useState, useCallback } from 'react'
import { appointmentService } from '@/services/appointmentService'
import { doctorService } from '@/services/doctorService'
import { useAppointmentData } from '@/hooks/useAppointmentData'
import AppointmentTable from '@/components/appointments/AppointmentTable'
import SearchBar from '@/components/bars/SearchBar'
import DateRangePicker from '@/components/Date/DateRangePicker'
import DropdownCheckbox from '@/components/Dropdowns/DropdownCheckbox'
import AppointmentIcon from '@/components/icons/AppointmentIcon'
import TitleWithIcon from '@/components/TitleWithIcon'
import Dropdown from '@/components/Dropdowns/Dropdown'
import { format } from 'date-fns'
import Link from 'next/link'

const initialRequest = {
	pn_id_especialidad: null,
	pv_filtro: '',
	pd_fecha_inicio: null,
	pd_fecha_fin: null,
	arregloEstados: [{
		"estado": 4
	}]
}

const AppointmentPage = () => {
	const [specialties, setSpecialties] = useState([])
	const [statusList, setStatusList] = useState([])
	const [statusState, setStatusState] = useState({})
	const [dateInitial, setDateInitial] = useState(null)
	const [dateFinal, setDateFinal] = useState(null)
	const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('Todas las especialidades')

	const [loadingTable, setLoadingTable] = useState(true)
	const { appointmentTable, fetchData } = useAppointmentData()

	const fetchInitialData = useCallback(async () => {
		try {
			const [statusData, specialtyData] = await Promise.all([appointmentService.listarEstados(), doctorService.listarEspecialidades()])
			setStatusList(statusData)
			setSpecialties(specialtyData)
			const statusStateInit = statusData.reduce((acc, status) => ({ ...acc, [status.idValue]: false }), {})
			setStatusState(statusStateInit)
			setLoadingTable(false)
		} catch (error) {
			console.error('Error al obtener datos iniciales:', error)
			setLoadingTable(false)
		}
	}, [])

	useEffect(() => {
		fetchInitialData()
		fetchData(initialRequest)
	}, [fetchInitialData])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const elements = e.target.elements
		const filtro = elements.namedItem('search-bar-appointments').value
		const filtroEspecialidad = elements.namedItem('speciality-dropdown').value

		const stateArray = Object.entries(statusState)
			.filter(([key, value]) => value)
			.map(([key, value]) => {
				return {
					estado: key
				}
			})

		const request = {
			pn_id_especialidad: filtroEspecialidad ? filtroEspecialidad : null,
			pv_filtro: filtro,
			pd_fecha_inicio: dateInitial ? format(dateInitial, 'yyyy-MM-dd') : null,
			pd_fecha_fin: dateFinal ? format(dateFinal, 'yyyy-MM-dd') : null,
			arregloEstados: stateArray
		}
		fetchData(request)
	}

	const options = [
		{
			text: 'Ver',
			link: '/appointments',
			icon: '/icons/eye.svg'
		}
	]

	return (
		<section className="w-full">
			
            <div className="text-xl font-bold text-black-500 px-4" style={{ color: "#28539E" }}>Citas pendientes</div>

			<section className="w-full p-4">
				<AppointmentTable data={appointmentTable} options={options} loadingTable={loadingTable} />
			</section>
		</section>
	)
}

export default AppointmentPage
