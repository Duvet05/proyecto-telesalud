import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart, IoHeartOutline , IoFastFood  , IoMedkit } from 'react-icons/io5'

export default function DashboardStatsGrid() {
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoFastFood className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Núm. de niños con anemia atendidos</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">23</strong>
						<span className="text-sm text-red-500 pl-2">+6</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoMedkit className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Núm. de hipertensos atendidos</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">39</strong>
						<span className="text-sm text-green-500 pl-2">-3</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoHeartOutline className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Núm. de partos realizados</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">12</strong>
						<span className="text-sm text-green-500 pl-2">+2</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Núm. de nuevos pacientes</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">265</strong>
						<span className="text-sm text-green-500 pl-2">+43</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
