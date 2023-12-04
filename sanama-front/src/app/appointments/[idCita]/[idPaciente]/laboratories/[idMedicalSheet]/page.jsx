"use client";
import React, { useEffect, useState } from "react";
import LaboratoryMSTable from "@/components/LaboratoryMSTable";
import { appointmentService } from "@/services/appointmentService";
import TitleWithIcon from "@/components/TitleWithIcon";
import LabIcon from "@/components/icons/LabIcon";
import { parseLaboratoryMSTable } from "@/util/laboratoryMSParser";
import { useParams } from "next/navigation";

const LaboratoryMSPage = () => {
  const [laboratoryData, setLaboratoryData] = useState([]);
  const [unparsedData, setUnparsedData] = useState([]);

  const params = useParams();
  const idMedicalSheet = params.idMedicalSheet;
  // const idMedicalSheet = 30;
  console.log("EL ID ES: ", idMedicalSheet);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await appointmentService.listarLaboratorios(
          idMedicalSheet
        );
        setUnparsedData(data);
        console.log("LA DATA SIN PARSEAR ES: ", data);
        const parsedData = parseLaboratoryMSTable(data);
        console.log("LA DATA ES: ", parsedData);
        setLaboratoryData(parsedData);
      } catch (error) {
        console.error("Error al obtener datos de laboratorioMS: ", error);
      }
    };

    fetchData();
  }, [idMedicalSheet]);

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Resultados de Laboratorio"} Icon={LabIcon} />
      <div className="mb-4 flex flex-grow" style={{ flex: "3 0 0%" }}>
        <InputField
          label="Médico prescriptor"
          value={unparsedData?.medicoConsulta}
          disabled
          width="w-1/2"
          labelWidth="w-full"
        />
      </div>
      <section>
        <LaboratoryMSTable data={laboratoryData}></LaboratoryMSTable>
      </section>

      <div className="col-span-3">
        <h4 className="text-3xl font-bold mb-4 mt-4">Observaciones</h4>

        <InputField
          value={unparsedData?.observaciones}
          type="textarea"
          name="observaciones"
          maxLength={1000}
        />
      </div>
    </section>
  );
};

const InputField = ({
  label,
  name,
  value,
  isEditable,
  type = "text",
  onChange,
  options = [],
  width = "w-full",
  labelWidth,
  placeholder = "Seleccione una opción",
}) => {
  const inputClass = `border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${width}  ${
    isEditable ? "bg-white cursor-text" : "bg-gray-300 cursor-not-allowed"
  }`;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
          />
        );
      case "select":
        return (
          <select
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
          >
            <option value="" disabled selected>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            disabled={!isEditable}
            onChange={onChange}
            className={`flex-1 ${inputClass}`}
          />
        );
    }
  };

  return (
    <div className={`mb-2 ${width}`}>
      <label
        className={`block text-lg font-medium text-gray-700 mb-2 ${labelWidth}`}
        htmlFor={name}
      >
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default LaboratoryMSPage;
