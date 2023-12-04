import React, { useState } from "react";

const AddMedicationForm = ({ onAddMedication }) => {
  const [nombre, setNombre] = useState("");
  const [indicacion, setIndicacion] = useState("");

  const handleAddMedication = () => {
    if (nombre.trim() && indicacion.trim()) {
      onAddMedication({ nombre: nombre.trim(), indicacion: indicacion.trim() });
      setNombre("");
      setIndicacion("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Medicamentos recetados:
      </label>
      <div className="mb-4 w-full flex space-x-2 items-center rounded-lg ">
        <input
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Ingresa medicamento..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Ingresa Indicaciones..."
          value={indicacion}
          onChange={(e) => setIndicacion(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddMedication}
          className="w-[130px] m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-l sm:w-auto px-5 py-3 text-center"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default AddMedicationForm;
