import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const patientFieldsConfig = [
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "tipoSeguro", label: "TIPO DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO", type: "date" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
  {
    name: "sexo",
    label: "SEXO",
    type: "select",
    options: ["Femenino", "Masculino", "Otro"],
  },
];

function PatientFieldsAppointment({
  isDisabled,
  patientData = {},
  onFormDataChange,
}) {
  const initialState = patientFieldsConfig.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState({ ...initialState, ...patientData });

  useEffect(() => {
    setFormData((prev) =>
      patientData ? { ...prev, ...patientData } : initialState
    );
  }, [patientData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleDateChange = (name, value) => {
    updateFormData(name, value ? dayjs(value).format("YYYY-MM-DD") : "");
  };

  const updateFormData = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      onFormDataChange(updatedData);
      return updatedData;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {patientFieldsConfig.map((field) => (
        <div className="col-span-1" key={field.name}>
          {field.type === "select" ? (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={isDisabled}
                value={formData[field.name]}
                onChange={handleInputChange}
              >
                <option value="Seguro A">Seguro A</option>
                <option value="Seguro B">Seguro B</option>
                <option value="Seguro C">Seguro C</option>
              </select>
            </div>
          ) : field.type === "date" ? (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type="date"
                id={field.name}
                name={field.name}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={isDisabled}
                value={formData[field.name]}
                onChange={(e) => handleDateChange(field.name, e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={isDisabled}
                value={formData[field.name]}
                onChange={handleInputChange}
                pattern={field.name === "dni" ? "[0-9]*" : undefined}
                maxLength={field.name === "dni" ? 8 : undefined}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PatientFieldsAppointment;
