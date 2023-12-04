import React, { useState } from "react";
import SearchMedicalSheet from "./SearchHojaMedica";
import { useParams } from "next/navigation";
import TextAreaField from "../common/TextAreaField";

const ChiefComplaint = ({ setMedicalRecordData }) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();

  const idPaciente = params.idPaciente;

  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          evaluacionMedica: {
            ...prevData.evaluacionMedica,
            [section]: value,
          },
        };
      }
      return prevData;
    });
  };

  const [hojaRefencia, setHojaRefencia] = useState(null);

  const addEvaluation = (selectedHoja) => {
    setHojaRefencia(selectedHoja);

    if (selectedHoja && selectedHoja.idHojaMedica) {
      setMedicalRecordData((prevData) => ({
        ...prevData,
        hojaRefencia: { idHojaReferenciada: selectedHoja.idHojaMedica },
      }));
    } else {
      console.error("Hoja Médica seleccionada no válida o sin ID.");
    }
  };

  const removeEvaluation = () => {
    setHojaRefencia(null);
    setMedicalRecordData((prevData) => ({
      ...prevData,
      hojaRefencia: null,
    }));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const MedicalSheetDetails = () => {
    if (!hojaRefencia) return null;

    return (
      <div className="bg-white p-4 rounded-md shadow">
        <h3 className="font-semibold text-lg">
          Continuar {hojaRefencia.codigo}
        </h3>
        <p>
          Especialidad: {hojaRefencia.citaMedica.medico.especialidad.nombre}
        </p>
        <p>
          Doctor: {hojaRefencia.citaMedica.medico.nombres}{" "}
          {hojaRefencia.citaMedica.medico.apellidoPaterno}{" "}
          {hojaRefencia.citaMedica.medico.apellidoMaterno}
        </p>
      </div>
    );
  };

  return (
    <div className="my-4 ml-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row-reverse">
          <button
            type="button"
            className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
            onClick={handleOpenModal}
          >
            Continuar Evaluación Existente
          </button>
          <button
            type="button"
            onClick={removeEvaluation}
            className=" m-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 
        font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
          >
            Limpiar
          </button>
        </div>
        <MedicalSheetDetails />

        <textarea
          label="Antecedentes:"
          name="evaluacionMedica.antecedentes"
          className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Ingresa los antecentes.."
          rows={4}
          onBlur={handleOnBlurChange}
        />
        <textarea
          label="Motivo de Consulta:"
          name="evaluacionMedica.motivoConsulta"
          className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Ingresa el motivo.."
          rows={4}
          onBlur={handleOnBlurChange}
        />
        <textarea
          label="Observaciones Adicionales:"
          name="evaluacionMedica.observaciones"
          className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
          placeholder="Ingresa observación.."
          rows={4}
          onBlur={handleOnBlurChange}
        />
        <SearchMedicalSheet
          idPaciente={idPaciente}
          show={showModal}
          onClose={handleCloseModal}
          onSelect={addEvaluation}
        />
      </div>
    </div>
  );
};

export default ChiefComplaint;
