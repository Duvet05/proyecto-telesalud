"use client"
import { useEffect, useState } from "react"
import TriajeTable from "./TriajeTable"
import { parseTriajeTable } from "@/util/triajeParser"
import SearchBar from "@/components/bars/SearchBar"
import { triajeService } from "@/services/triajeService"
import TitleWithIcon from "@/components/TitleWithIcon"
import TriageIcon from "@/components/icons/TriageIcon"
import DateRangePicker from "@/components/Date/DateRangePicker"
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox"
import { laboratoryService } from "@/services/laboratoryService"
import { format } from "date-fns"

const TriajePage = () => {
  const [triajeTable, setTriajeTable] = useState([])
  const [dateInitial, setDateInitial] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
  const [statusList, setStatusList] = useState([])
  const [statusState, setStatusState] = useState({})

  const [loadingTable, setLoadingTable] = useState(true)

  const initialRequest = {
    pn_id_triaje: null,
    pv_filtro: "",
    pd_fecha_inicio: null,
    pd_fecha_fin: null,
    arregloEstados: [
      {
        estado: null,
      },
    ],
  }

  const fetchData = async (request) => {
    try {
      const data = await triajeService.listarTriajePorFiltro(request)
      const tableData = parseTriajeTable(data)
      setTriajeTable(tableData)
      setLoadingTable(false)
    } catch (error) {
      console.log("No se pudo obtener los datos de los triajes")
      setLoadingTable(false)
    }
  }

  const fetchStateList = async () => {
    try {
      const data = await laboratoryService.listarEstadosOrdenesLaboratorio()
      setStatusList(data)
      let initialValues = {}
      data.forEach((status) => {
        initialValues[status.idValue] = false
      })
      // console.log(initialValues)
      setStatusState(initialValues)
    } catch (error) {
      console.log("No se pudo obtener la lista de estados")
    }
  }

  useEffect(() => {
    fetchStateList()
    fetchData(initialRequest)
  }, [])

  const handleSubmit = async (e) => {
    const stateArray = Object.entries(statusState)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return {
          estado: key,
        }
      })
    e.preventDefault()
    const elements = e.target.elements
    const filtro = elements.namedItem("patients-search").value
    const fechaDesde = dateInitial ? format(dateInitial, "yyyy-MM-dd") : null
    const fechaHasta = dateFinal ? format(dateFinal, "yyyy-MM-dd") : null
    const request = {
      pn_id_triaje: null,
      pv_filtro: filtro,
      pd_fecha_inicio: fechaDesde,
      pd_fecha_fin: fechaHasta,
      arregloEstados: stateArray,
    }
    fetchData(request)
  }

  const options = [
    {
      text: "Ver triaje",
      link: "/triajes/",
      icon: "fa fa-eye",
    },
  ]

  return (
    <section className="w-full px-14 py-6">
      <TitleWithIcon name={"Triajes"} Icon={TriageIcon} />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          <SearchBar
            name={"patients-search"}
            width={"flex-grow"}
            height={"h-[45px]"}
            placeholderText="Buscar por Nombre, DNI o Código del Triaje"
          />

          <DropdownCheckbox
            text={"Estado"}
            statusList={statusList}
            statusState={statusState}
            setStatusState={setStatusState}
            height={"h-[45px]"}
          />

          <DateRangePicker
            dateInitial={dateInitial}
            setDateInitial={setDateInitial}
            dateFinal={dateFinal}
            setDateFinal={setDateFinal}
          />

          <button
            type="submit"
            className="h-[45px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            Buscar
          </button>
        </div>
      </form>

      <section>
        <TriajeTable data={triajeTable} options={options} loadingTable={loadingTable}></TriajeTable>
      </section>
    </section>
  )
}

export default TriajePage
