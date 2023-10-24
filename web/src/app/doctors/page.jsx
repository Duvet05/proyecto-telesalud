"use client"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"
import DropDownSearchBar from "@/components/bars/DropDownSearchBar"
import { parseDoctorsTable } from "@/util/doctorParser"

const DoctorsPage = () => {
    const [doctorTable, setDoctorTable] = useState([])
    const [filtro, setFiltro] = useState("")
    const [specialties, setSpecialties] = useState([])

    const fetchData = async (filtro, especialidad) => {
        try {
            const data = await doctorService.buscarPorMedicoEspecialidad(filtro, especialidad)
            const tableData = parseDoctorsTable(data)
            console.log(tableData)
            setDoctorTable(tableData)
        } catch (error) {
            console.log("No se pudo obtener los datos de los doctores")
        }
    }


    const fetchSpecialty = async () => {
        try {
            const data = await doctorService.listarEspecialidades()
            setSpecialties(data)
            //console.log(data)
        } catch (error) {
            console.log("No se pudo obtener los datos de las especialidades")
        }
    }


    useEffect(() => {
        fetchData("", "")
        fetchSpecialty("")
    }, [])


    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Gestión de Médicos</h1>
            <DropDownSearchBar
                filtro={filtro}
                setFiltro={setFiltro}
                fetchData={fetchData}
                data={specialties}
                defaultText={"Todas las especialidades"}
                text={"nombre"}
                defaultValue={""}
                value={"nombre"}
            />
            <DoctorTable data={doctorTable}></DoctorTable>
        </section>

    )
}

export default DoctorsPage