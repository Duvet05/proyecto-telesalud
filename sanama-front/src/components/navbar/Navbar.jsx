import { usePathname } from 'next/navigation'
import AppointmentIcon from '../icons/AppointmentIcon'
import DoctorIcon from '../icons/DoctorIcon'
import LabIcon from '../icons/LabIcon'
import PatientIcon from '../icons/PatientIcon'
import TriageIcon from '../icons/TriageIcon'
import NavbarItem from './NavbarItem'
import Link from 'next/link'
import SanamaIcon from '../icons/SanamaIcon'

const Navbar = () => {
	const navbarItems = [
		{ name: 'Pacientes', route: '/patients', Icon: PatientIcon },
		{ name: 'Doctores', route: '/doctors', Icon: DoctorIcon },
		{ name: 'Citas', route: '/appointments', Icon: AppointmentIcon },
		{ name: 'Triajes', route: '/triajes', Icon: TriageIcon },
		{ name: 'Laboratorios', route: '/laboratories', Icon: LabIcon }
	]
	const pathname = usePathname()

	const isActive = (route) => pathname.startsWith(route)

	return (
		<nav className="bg-[#28539E] px-6 py-2 flex justify-between">
			<Link href="/">
				<div className="flex items-center">
					<SanamaIcon className="mr-4" />
					<span className="self-center text-2xl font-bold tracking-wider  text-white">SANAMA</span>
				</div>
			</Link>

			<div className="max-w-screen-xl flex flex-wrap items-center justify-between">
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className=" flex flex-row font-semibold rounded-lg text-md text-white">
						{navbarItems.map((item) => (
							<NavbarItem
								key={item.route}
								name={item.name}
								route={item.route}
								icon={item.Icon}
								isActive={isActive(item.route)}
							/>
						))}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
