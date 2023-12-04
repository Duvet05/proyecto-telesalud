import React, { useState } from "react";

const VitalSigns = ({ defaultTriaje, setMedicalRecordData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const pattern = fields.find((field) => field.name === name).pattern;
    const regex = new RegExp(pattern);
    const isValid = regex.test(value);

    setMedicalRecordData((prevState) => {
      const sections = name.split(".");
      if (sections.length === 3) {
        const [_, section, key] = sections;
        return {
          ...prevState,
          evaluacionMedica: {
            ...prevState.evaluacionMedica,
            [section]: {
              ...prevState.evaluacionMedica[section],
              [key]: value,
            },
          },
        };
      }
      return prevState;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? !isValid : false,
    }));
  };

  const fields = [
    {
      type: "number",
      label: "Temperatura (°C)",
      name: "evaluacionMedica.signosVitales.temperatura",
      value: defaultTriaje.temperatura,
      pattern: "^(3[6-9](\\.\\d)?|40(\\.0)?)$", // Asegúrate de escapar los caracteres especiales
    },
    {
      type: "number",
      label: "Frecuencia Cardiaca (lat/min)",
      name: "evaluacionMedica.signosVitales.frecuenciaCardiaca",
      value: defaultTriaje.frecuenciaCardiaca,
      pattern: "^([6-9]\\d|100)$", // Valores entre 60 y 100
    },
    {
      type: "number",
      label: "Frecuencia Respiratoria (res/min)",
      name: "evaluacionMedica.signosVitales.frecuenciaRespiratoria",
      value: defaultTriaje.frecuenciaRespiratoria,
      pattern: "^1[2-9]|20$", // Valores entre 12 y 20
    },
    {
      type: "number",
      label: "Presión Arterial Diastolica (mm Hg)",
      name: "evaluacionMedica.signosVitales.presionDiastolica",
      value: defaultTriaje.presionDiastolica,
      pattern: "^(1[0-2]\\d|130)$", // Formato como "120/80"
    },
    {
      type: "number",
      label: "Presión Arterial Diastolica (mm Hg)",
      name: "evaluacionMedica.signosVitales.presionSistolica",
      value: defaultTriaje.presionSistolica,
      pattern: "^80|9[5-9]$", // Formato como "120/80"
    },
    {
      type: "number",
      label: "Saturación de Oxígeno (%)",
      name: "evaluacionMedica.signosVitales.saturacionOxigeno",
      value: defaultTriaje.saturacionOxigeno,
      pattern: "^(9[5-9]|100)$", // Valores entre 95 y 100
    },
  ];

  const renderInputField = (field) => (
    <div key={field.name}>
      <label className="truncate block text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        defaultValue={defaultTriaje[field.name]}
        onChange={handleInputChange}
        className={`truncate mt-1 p-2 w-full border-gray-300 rounded-md ${
          errors[field.name] ? "border-red-500" : ""
        }`}
        placeholder={field.label}
        pattern={field.pattern}
        title={`Ingrese un valor válido para ${field.label}`}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-xs italic">Ingrese un valor válido</p>
      )}
    </div>
  );

  return (
    <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {fields.map(renderInputField)}
    </div>
  );
};

export default VitalSigns;
