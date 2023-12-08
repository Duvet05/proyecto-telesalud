"use client";
import { useEffect, useState } from "react";
import PatientTable from "@/components/patients/PatientTable";
import { patientService } from "@/services/patientService";
import { parsePatientTable } from "@/util/patientParser";
import SearchBar from "@/components/bars/SearchBar";
import PatientIcon from "@/components/icons/PatientIcon";
import TitleWithIcon from "@/components/TitleWithIcon";

const PatientPage = () => {
  const [patientTable, setPatientTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const fetchData = async (filtro) => {
    try {
      const data = await patientService.buscarPorFiltro(filtro);
      const tableData = parsePatientTable(data);
      console.log(tableData);
      setPatientTable(tableData);
      setLoadingTable(false);
    } catch (error) {
      console.log("No se pudo obtener los datos de los pacientes");
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const filtro = elements.namedItem("patients-search").value;
    fetchData(filtro);
  };

  const options = [
    {
      text: "Ver perfil",
      link: "/patients/profile",
      icon: "fa fa-eye",
    },
  ];

  return (
    <section className="w-full px-14 py-6">
      <TitleWithIcon name={"Pacientes"} Icon={PatientIcon} />

      <form className="flex items-center" onSubmit={handleSubmit}>
        <SearchBar
          name={"patients-search"}
          width={"w-full"}
          height={"h-[45px]"}
          placeholderText={"Buscar por Nombre o DNI"}
        />

        <button
          type="submit"
          className="h-[45px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
      </form>
      <section className="w-full">
        <PatientTable
          data={patientTable}
          options={options}
          loadingTable={loadingTable}
        />
      </section>
    </section>
  );
};

export default PatientPage;
