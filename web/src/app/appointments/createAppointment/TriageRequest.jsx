import React, { useState } from "react";
import { useAppointments } from "@/context/AppointmentsContext";

const TriageRequest = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const { setAppointmentData } = useAppointments();

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "option1") {
      setAppointmentData((prevData) => ({ ...prevData, selectedTriage: true }));
    } else if (button === "option2") {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedTriage: false,
      }));
    }
  };

  return (
    <div className="max-w-sm mt-8 mx-auto p-8 bg-white shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        ¿Desea enviar al paciente a triaje?
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => handleButtonClick("option1")}
          className={`w-full px-4 py-2 rounded-md text-white transition ${
            selectedButton === "option1"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Sí, enviar a triaje
        </button>
        <button
          onClick={() => handleButtonClick("option2")}
          className={`w-full px-4 py-2 rounded-md text-white transition ${
            selectedButton === "option2"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          No, no enviar a triaje
        </button>
      </div>
    </div>
  );
};

export default TriageRequest;
