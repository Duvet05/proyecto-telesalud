"use client"
import { useEffect, useState } from "react"
import LaboratoryTable from "./LaboratoryTable"
import { parseLaboratoryTable } from "@/util/laboratoryParser"
import SearchBar from "@/components/bars/SearchBar"
import { laboratoryService } from "@/services/laboratoryService"
import TitleWithIcon from "@/components/TitleWithIcon"
import LabIcon from "@/components/icons/LabIcon"
import DateRangePicker from "@/components/Date/DateRangePicker"
import DropdownCheckbox from "@/components/Dropdowns/DropdownCheckbox"
import { format } from "date-fns"

const LaboratoryPage = () => {
  const [laboratoryTable, setLaboratoryTable] = useState([])
  const [filtro, setFiltro] = useState("")
  const [dateInitial, setDateInitial] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
  const [statusList, setStatusList] = useState([])
  const [statusState, setStatusState] = useState({})
  const initialRequest = {
    pn_id_laboratory: null,
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
      const data = await laboratoryService.listarOrdenLaboratorioPorFiltro(
        request
      )
      const tableData = parseLaboratoryTable(data)
      setLaboratoryTable(tableData)
    } catch (error) {
      console.error("No se pudo obtener los datos de los laboratorios", error)
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
      console.log(initialValues)
      setStatusState(initialValues)
    } catch (error) {
      console.log("No se pudo obtener la lista de estados")
    }
  }

  useEffect(() => {
    fetchStateList()
    fetchData(initialRequest)
  }, [])

  const handleSubmit = (e) => {
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
      pn_id_laboratory: null,
      pv_filtro: filtro,
      pd_fecha_inicio: fechaDesde,
      pd_fecha_fin: fechaHasta,
      arregloEstados: stateArray,
    }
    fetchData(request)
  }

  return (
    <section className="w-full px-14 py-6">
      <TitleWithIcon name={"Laboratorios"} Icon={LabIcon} />

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          <SearchBar
            name={"patients-search"}
            width={"flex-grow"}
            placeholderText="Buscar por Nombre, DNI o Código de la Orden"
            height={"h-[45px]"}
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
        <LaboratoryTable data={laboratoryTable}></LaboratoryTable>
      </section>
    </section>
  )
}

export default LaboratoryPage
