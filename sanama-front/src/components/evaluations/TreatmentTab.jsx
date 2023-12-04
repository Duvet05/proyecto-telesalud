import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import AddMedicationForm from "../todolist/AddMedicationForm";
import MedicationList from "../todolist/MedicationList";
import { useTratamientoData } from "@/hooks/useTratamientoData";
import TextAreaField from "../common/TextAreaField";

const TratamientoYDecisionCita = ({ setMedicalRecordData }) => {
  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          evaluacionMedica: {
            ...prevData.evaluacionMedica,
            [section]: value,
          },
        };
      }
      return prevData;
    });
  };

  const initialState = {
    recetasMedicas: [],
    fechaCaducidad: "",
  };
  const {
    tratamientoData,
    addRecetaMedica,
    removeRecetaMedica,
    updateRecetaMedica,
  } = useTratamientoData(initialState, setMedicalRecordData);

  const handleOnChange = (selectedDate) => {
    setMedicalRecordData((prevData) => ({
      ...prevData,
      recetaMedica: {
        ...prevData.recetaMedica,
        fechaCaducidad: selectedDate,
      },
    }));
  };

  const [showFinal, setShowFinal] = useState(false);

  const defaultOptions = {
    autoHide: false,
    todayBtn: true,
    todayBtnText: "Hoy",
    clearBtn: false,
    datepickerClassNames: "top-17",
    defaultDate: null,
    language: "es",
    disabledDates: [],
    theme: {
      input: "mb-4 text-center w-1/6",
      disabled: "text-gray-900 text-gray-600",
    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputPlaceholderProp: "Selecciona una fecha",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };

  const handleCloseFinal = (state) => {
    setShowFinal(state);
  };

  return (
    <div className="ml-4">
      <h4 className="text-lg font-bold text-gray-700 mb-2">Receta Médica</h4>
      <div className="my-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Caducidad:
          </label>
          <Datepicker
            className="mt-1 p-2 min-w-7xl border-gray-300 rounded-md"
            value={tratamientoData.fechaCaducidad}
            onChange={handleOnChange}
            placeholder="Fecha de Caducidad"
            show={showFinal}
            setShow={handleCloseFinal}
            options={defaultOptions}
          />
        </div>
        <AddMedicationForm
          onAddMedication={(newMedication) => addRecetaMedica(newMedication)}
        />
        <div className="my-4 h-[300px] overflow-y-auto border-2">
          <MedicationList
            medications={tratamientoData.recetasMedicas}
            onEditMedication={updateRecetaMedica}
            onDeleteMedication={removeRecetaMedica}
          />
        </div>
      </div>
      <TextAreaField
        label="Indicaciones Finales:"
        name="evaluacionMedica.indicacionesFinales"
        placeholder="Ingresa indicaciones adicionales.."
        onBlur={handleOnBlurChange}
      />
    </div>
  );
};

export default TratamientoYDecisionCita;
