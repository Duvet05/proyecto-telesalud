"use client"
import { useEffect, useState } from "react"
import PatientTable from "./PatientTable"
import { patientService } from "@/services/patientService"
import { parsePatientTable } from "@/util/patientParser"
import SearchBar from "@/components/bars/SearchBar"


const PatientPage = () => {
    const [patientTable, setPatientTable] = useState([])
    const [filtro, setFiltro] = useState("")

    const fetchData = async (filtro) => {
        try {
            const data = await patientService.buscarPorFiltro(filtro)
            const tableData = parsePatientTable(data)
            console.log(tableData)
            setPatientTable(tableData)
        } catch (error) {
            console.log("No se pudo obtener los datos de los pacientes")
        }
    }

    useEffect(() => {
        fetchData("")
    }, [])


    return (
        <section className="  p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8" >Gestión de Pacientes</h1>
            <SearchBar filtro={filtro} setFiltro={setFiltro} fetchData={fetchData} />
            <PatientTable data={patientTable}></PatientTable>
        </section>
    )
}

export default PatientPage