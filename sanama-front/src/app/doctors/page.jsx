"use client"
import DoctorTable from "./DoctorsTable"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"
import { parseDoctorsTable } from "@/util/doctorParser"
import Dropdown from "@/components/Dropdowns/Dropdown"
import SearchBar from "@/components/bars/SearchBar"
import DoctorIcon from "@/components/icons/DoctorIcon"
import TitleWithIcon from "@/components/TitleWithIcon"
import Link from "next/link"

const DoctorsPage = () => {
  const [doctorTable, setDoctorTable] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("Todas las especialidades")
  const [loadingTable, setLoadingTable] = useState(true)

  const fetchData = async (filtro, especialidad) => {
    try {
      const data = await doctorService.buscarPorMedicoEspecialidad(
        filtro,
        especialidad
      )
      const tableData = parseDoctorsTable(data)
      setDoctorTable(tableData)
      setLoadingTable(false)
    } catch (error) {
      console.log("No se pudo obtener los datos de los doctores")
      setLoadingTable(false)
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

  const options = [
    {
      text: "Ver perfil",
      link: "/doctors/profile",
      icon: "fa fa-eye",
    },
  ]

  useEffect(() => {
    fetchData("", "")
    fetchSpecialty()
  }, [])

  // useEffect(() => {
  //     fetchData("", especialidadSeleccionada)
  // }, [especialidadSeleccionada])

  const handleSubmit = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const dropdownValue = elements.namedItem("speciality-dropdown").value
    const filtro = elements.namedItem("doctor-search").value
    fetchData(filtro, dropdownValue)
  }

  return (
    <section className="w-full px-14 py-6">
      <section className="flex justify-between items-center ">
        <TitleWithIcon name={"Doctores"} Icon={DoctorIcon} />
        <Link
          className="w-[180px] text-center font-bold text-white  bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-4"
          href="/doctors/newDoctor"
        >
          Agregar doctor
        </Link>
      </section>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <SearchBar
          name={"doctor-search"}
          width={"w-full"}
          height={"h-[45px]"}
          placeholderText={"Buscar por Nombre o CMP"}
        ></SearchBar>

        <Dropdown
          data={specialties}
          defaultText={"Todas las especialidades"}
          text={"nombre"}
          defaultValue={""}
          value={"nombre"}
          name={"speciality-dropdown"}
          width={"w-[400px]"}
          height={"h-[44px]"}
          handleChange={(event) => {
            setEspecialidadSeleccionada(event.target.value)
          }}
        ></Dropdown>

        <button
          type="submit"
          className="h-[45px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>

      <section className="w-full">
        <DoctorTable data={doctorTable} options={options} loadingTable={loadingTable}></DoctorTable>
      </section>
    </section>
  )
}

export default DoctorsPage
