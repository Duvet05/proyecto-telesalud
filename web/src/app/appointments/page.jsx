//Listado de citas
"use client"

import SearchBar from "@/components/bars/SearchBar"
import { useEffect, useState } from "react"
import AppointmentTable from "./AppointmentTable"
import { appointmentService } from "@/services/appointmentService"
import Link from "next/link"

const AppointmentPage = () => {
    // const [filtro, setFiltro] = useState("")
    const [appointmentTable, setAppointmentTable] = useState([])

    const fetchData = async () => {
        try {
            const data = await appointmentService.listar()
            // const tableData = parseAppointmentTable(data)
            console.log(data)
            // setAppointmentTable(tableData)
        } catch (error) {
            console.log("No se pudo obtener la lista de las citas")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Citas</h1>
            <SearchBar />
            <Link href='appointments/createAppointment'>Crear cita</Link>
            <AppointmentTable data={appointmentTable}></AppointmentTable>
        </section>
    )
}

export default AppointmentPage