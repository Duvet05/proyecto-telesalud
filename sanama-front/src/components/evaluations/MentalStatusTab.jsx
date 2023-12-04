import React from "react";

const GlasgowComaScale = ({ setMedicalRecordData }) => {
  const gcsValues = {
    eyesOpen: {
      "Espontánea": 4,
      "Al estímulo verbal": 3,
      "Al estímulo doloroso": 2,
      "Sin respuesta": 1,
    },
    talkingCorrectly: {
      "Orientado y conversando": 5,
      "Palabras inapropiadas": 3,
      "Sonidos incomprensibles": 2,
      "Sin respuesta": 1,
    },
    ableToMoveBody: {
      "Obedece órdenes verbales": 6,
      "Localiza el dolor": 5,
      "Retirada al dolor": 4,
      "Flexión anormal al dolor": 3,
      "Extensión anormal al dolor": 2,
      "Sin respuesta": 1,
    },
  };

  const handleGlasgowChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      // Calcula la puntuación de Glasgow sobre la marcha
      const newGlasgowScore = {
        ...prevData.evaluacionMedica.glasgow,
        [name]: gcsValues[name][value],
      };

      // Suma las puntuaciones para obtener el total
      const totalScore = Object.values(newGlasgowScore).reduce(
        (acc, curr) => acc + curr,
        0
      );

      return {
        ...prevData,
        evaluacionMedica: {
          ...prevData.evaluacionMedica,
          glasgow: totalScore,
          [name]: gcsValues[name][value],
        },
      };
    });
  };

  const renderOptions = (categoryValues) => {
    return Object.entries(categoryValues).map(([key, value]) => (
      <option key={value} value={key}>
        {key}
      </option>
    ));
  };
  return (
    <div className="ml-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Apertura de Ojos
        </label>
        <select
          name="eyesOpen"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.eyesOpen)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Verbal
        </label>
        <select
          name="talkingCorrectly"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.talkingCorrectly)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Motora
        </label>
        <select
          name="ableToMoveBody"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.ableToMoveBody)}
        </select>
      </div>
    </div>
  );
};

export default GlasgowComaScale;
