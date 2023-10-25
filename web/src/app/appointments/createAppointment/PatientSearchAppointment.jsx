import React, { useState } from "react";

function PatientSearchAppointment({
  allPatients,
  onSelect,
  onAdd,
  isEditing,
  disabled,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleAutoCompleteChange = (event) => {
    const value = allPatients.find(
      (patient) =>
        `${patient.nombres} ${patient.apellidoPaterno} ${patient.apellidoMaterno}` ===
        event.target.value
    );
    onSelect(value);
    setSelectedValue(value);
    if (!value) {
      setInputValue("");
    }
  };

  const handleAddOrCancel = (event) => {
    event.preventDefault(); // Prevent form submission
    onAdd();
    setSelectedValue(null);
    setInputValue("");
  };

  const isAddMode = !selectedValue && inputValue !== "";
  const label = isEditing
    ? "Cancelar"
    : isAddMode
    ? "Agregar"
    : "Agregar paciente";
  const icon = isEditing ? "✕" : "＋";
  const buttonClass = isEditing ? "bg-red-500" : "bg-blue-500";
  const isButtonDisabled = selectedValue || inputValue;

  return (
    <form onSubmit={handleAddOrCancel} className="flex items-center">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          list="patients"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar por nombre..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleAutoCompleteChange}
          disabled={disabled}
          required
        />
        <datalist id="patients">
          {allPatients.map((patient, index) => (
            <option
              key={index}
              value={`${patient.nombres} ${patient.apellidoPaterno} ${patient.apellidoMaterno}`}
            />
          ))}
        </datalist>
        <button
          type="submit"
          className={`text-white absolute right-2.5 bottom-2.5 ${buttonClass} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isButtonDisabled}
        >
          {icon} {label}
        </button>
      </div>
    </form>
  );
}

export default PatientSearchAppointment;
