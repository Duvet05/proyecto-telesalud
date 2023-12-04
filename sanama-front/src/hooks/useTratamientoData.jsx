import React, { useState, useCallback } from "react";

export function useTratamientoData(initialState, setMedicalRecordData) {
  const [tratamientoData, setTratamientoData] = useState(initialState);

  const updateRecetaMedica = useCallback(
    (index, updatedMedication) => {
      setTratamientoData((prevState) => {
        const updatedRecetasMedicas = [...prevState.recetasMedicas];
        updatedRecetasMedicas[index] = updatedMedication;
        return { ...prevState, recetasMedicas: updatedRecetasMedicas };
      });

      // Actualizar también el estado global
      setMedicalRecordData((prevData) => {
        const updatedMedications = [...prevData.recetaMedica.medicamentos];
        updatedMedications[index] = updatedMedication;
        return {
          ...prevData,
          recetaMedica: {
            ...prevData.recetaMedica,
            medicamentos: updatedMedications,
          },
        };
      });
    },
    [setMedicalRecordData]
  );

  const addRecetaMedica = useCallback(
    (newMedication) => {
      setTratamientoData((prevState) => ({
        ...prevState,
        recetasMedicas: [...prevState.recetasMedicas, newMedication],
      }));

      // Actualizar también el estado global
      setMedicalRecordData((prevData) => ({
        ...prevData,
        recetaMedica: {
          ...prevData.recetaMedica,
          medicamentos: [...prevData.recetaMedica.medicamentos, newMedication],
        },
      }));
    },
    [setMedicalRecordData]
  );

  const removeRecetaMedica = useCallback(
    (index) => {
      setTratamientoData((prevState) => {
        const updatedRecetasMedicas = [...prevState.recetasMedicas];
        updatedRecetasMedicas.splice(index, 1);
        return { ...prevState, recetasMedicas: updatedRecetasMedicas };
      });

      // Actualizar también el estado global
      setMedicalRecordData((prevData) => {
        const updatedMedications = [...prevData.recetaMedica.medicamentos];
        updatedMedications.splice(index, 1);
        return {
          ...prevData,
          recetaMedica: {
            ...prevData.recetaMedica,
            medicamentos: updatedMedications,
          },
        };
      });
    },
    [setMedicalRecordData]
  );

  return {
    tratamientoData,
    addRecetaMedica,
    removeRecetaMedica,
    updateRecetaMedica,
  };
}
