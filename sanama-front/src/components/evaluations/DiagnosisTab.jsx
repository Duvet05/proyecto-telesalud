import React, { useState } from "react";
import SearchDiagnostic from "./SearchDiagnostic";

const DiagnosticoMedico = ({ setMedicalRecordData }) => {
  // State
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to add a diagnostic
  const addDiagnostic = (selectedDiagnostic) => {
    const newDiagnosticos = [...diagnosticos, selectedDiagnostic];
    setDiagnosticos(newDiagnosticos);
    setMedicalRecordData((prevData) => ({
      ...prevData,
      evaluacionMedica: {
        ...prevData.evaluacionMedica,
        diagnosticos: newDiagnosticos,
      },
    }));
  };

  // Function to remove a diagnostic
  const removeDiagnostic = (index) => {
    const newDiagnosticos = diagnosticos.filter((_, i) => i !== index);
    setDiagnosticos(newDiagnosticos);
    setMedicalRecordData((prevData) => ({
      ...prevData,
      evaluacionMedica: {
        ...prevData.evaluacionMedica,
        diagnosticos: newDiagnosticos,
      },
    }));
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="ml-4 py-8">
      <h4 className="text-lg font-bold text-gray-700 mb-2">
        Diagnóstico Médico
      </h4>
      <div className="flex flex-row-reverse">
        <button
          type="button"
          onClick={handleOpenModal}
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Buscar Diagnostico
        </button>
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Diagnóstico (CIE-10)
        </label>
        {diagnosticos.map((diagnose, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={`${diagnose.idCiex} - ${diagnose.ciex}`}
              readOnly
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeDiagnostic(index)}
              className="mt-1 h-full w-[40px] bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <SearchDiagnostic
        show={showModal}
        onClose={handleCloseModal}
        onSelect={addDiagnostic}
      />
    </div>
  );
};

export default DiagnosticoMedico;
