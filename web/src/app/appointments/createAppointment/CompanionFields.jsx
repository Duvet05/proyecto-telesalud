import React, { useState, useEffect } from "react";
import { useAppointments } from "@/context/AppointmentsContext";

const companionFieldsConfig = [
  {
    label: "DOCUMENTO DE IDENTIDAD",
    pattern: "[0-9]*",
    maxLength: 8,
    name: "documentoIdentidad",
  },
  {
    label: "NOMBRES",
    name: "nombres",
  },
  {
    label: "PRIMER APELLIDO",
    name: "primerApellido",
  },
  {
    label: "SEGUNDO APELLIDO",
    name: "segundoApellido",
  },
  {
    label: "FECHA DE NACIMIENTO",
    name: "fechaNacimiento",
  },
];

function CompanionFields() {
  const { setAppointmentData } = useAppointments();

  const [companionData, setCompanionData] = useState({
    documentoIdentidad: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    relationship: "",
  });
  const [documentError, setDocumentError] = useState(false);

  const handleInputChange = (event, fieldName) => {
    const { name, value } = event.target;

    setCompanionData((prevData) => ({
      ...prevData,
      [fieldName || name]: value,
    }));

    if (fieldName === "documentoIdentidad") {
      setDocumentError(value.length !== 8);
    }
  };

  useEffect(() => {
    setAppointmentData((prevData) => ({
      ...prevData,
      companionData: companionData,
    }));
  }, [companionData, setAppointmentData]);

  const renderInputField = (field) => (
    <div className="flex flex-col">
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <input
        type="text"
        id={field.name}
        name={field.name}
        required
        className={`mt-1 p-2 border rounded-md w-full ${
          documentError && field.name === "documentoIdentidad"
            ? "border-red-500"
            : "border-gray-300"
        }`}
        pattern={field.pattern}
        maxLength={field.maxLength}
        onChange={(e) => handleInputChange(e, field.name)}
      />
      {documentError && field.name === "documentoIdentidad" && (
        <p className="mt-1 text-sm text-red-500">Debe tener 8 dígitos</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {companionFieldsConfig.map((field, index) => (
        <div key={index}>{renderInputField(field)}</div>
      ))}
      <div className="flex flex-col">
        <label
          htmlFor="relationship"
          className="text-sm font-medium text-gray-700"
        >
          PARENTESCO
        </label>
        <select
          id="relationship"
          name="relationship"
          required
          value={companionData.relationship}
          onChange={(e) => handleInputChange(e, "relationship")}
          className="mt-1 p-2 border rounded-md w-full border-gray-300"
        >
          <option value="hermano">Hermano</option>
          <option value="hermana">Hermana</option>
          <option value="madre">Madre</option>
          <option value="padre">Padre</option>
          <option value="apoderado">Apoderado</option>
          <option value="otros">Otros</option>
        </select>
      </div>
    </div>
  );
}

export default CompanionFields;
