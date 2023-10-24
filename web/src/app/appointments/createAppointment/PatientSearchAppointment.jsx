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

  const handleAddOrCancel = () => {
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
    <div className="flex items-center">
      <input
        type="text"
        list="patients"
        className="border p-2 flex-1 mr-2"
        placeholder="Buscar por nombre..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleAutoCompleteChange}
        disabled={disabled}
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
        onClick={handleAddOrCancel}
        className={`text-white p-2 ${buttonClass} ${
          isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isButtonDisabled}
      >
        {icon} {label}
      </button>
    </div>
  );
}

export default PatientSearchAppointment;
