"use client"
import { useEffect, useState } from "react"
import TriajeTable from "./TriajeTable"
import { parseTriajeTable } from "@/util/triajeParser"
import SearchBar from "@/components/bars/SearchBar"
import { triajeService } from "@/services/triajeService"

const TriajePage = () => {
    const [triajeTable, setTriajeTable] = useState([])
    const [filtro, setFiltro] = useState("")

    const fetchData = async (filtro) => {
        try {
            const data = await triajeService.listarTriajePorFiltro(filtro)
            console.log(data)
            const tableData = parseTriajeTable(data)

            //setTriajeTable(tableData)
        } catch (error) {
            console.log("No se pudo obtener los datos de los triajes")
        }
    }

    useEffect(() => {
        fetchData("")
    }, [])

    return (
        <section className="p-10">
            <h1 className="font-bold text-blue-500 text-6xl pb-8">Gestión de Triajes</h1>
            <SearchBar filtro={filtro} setFiltro={setFiltro} fetchData={fetchData} />
            <TriajeTable data={triajeTable}></TriajeTable>
        </section>
    )
}

export default TriajePage
