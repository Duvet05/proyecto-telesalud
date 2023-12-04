"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const useMedicalRecordForm = () => {
  const params = useParams();
  const idCita = params.idCita;

  const [medicalRecordData, setMedicalRecordData] = useState({
    hojaRefencia: null,
    firma: null,
    idCitaMedica: idCita, // default value
    evaluacionMedica: {
      motivoConsulta: "",
      antecedentes: "",
      examenGeneral: "",
      pielYFaneras: "",
      cabezaYCuello: "",
      toraxYPulmones: "",
      cardiovascular: "",
      abdomen: "",
      urogenital: "",
      extremidades: "",
      snc: "",
      glasgow: "",
      eyesOpen: "",
      talkingCorrectly: "",
      ableToMoveBody: "",
      observaciones: "",
      indicacionesFinales: "",
      requiereSignosVitales: false,
      signosVitales: {
        temperatura: "",
        frecuenciaCardiaca: "",
        frecuenciaRespiratoria: "",
        presionArterial: "",
        saturacionOxigeno: "",
        peso: "",
        talla: "",
      },
      diagnosticos: [],
    },
    recetaMedica: {
      fechaCaducidad: "",
      medicamentos: [],
    },
  });

  const [errorMessageMedicalRecordForm, setErrorMessageMedicalRecordForm] =
    useState("");

  const validateMedicalRecordForm = () => {
    let isValid = true;
    let errors = [];

    if (
      !medicalRecordData.evaluacionMedica.motivoConsulta ||
      !medicalRecordData.evaluacionMedica.motivoConsulta.trim()
    ) {
      errors.push("Motivo de la consulta es obligatorio.");
      isValid = false;
    }

    // Validate 'antecedentes' - Mandatory
    if (
      !medicalRecordData.evaluacionMedica.antecedentes ||
      !medicalRecordData.evaluacionMedica.antecedentes.trim()
    ) {
      errors.push("Antecedentes son obligatorios.");
      isValid = false;
    }

    // Validate 'diagnosticos' - Mandatory
    if (!medicalRecordData.evaluacionMedica.diagnosticos.length) {
      errors.push("Debe agregar al menos un diagnóstico.");
      isValid = false;
    }

    // Validate 'recetaMedica.fechaCaducidad' - Mandatory
    if (!medicalRecordData.recetaMedica.fechaCaducidad) {
      errors.push("La fecha de caducidad de la receta es obligatoria.");
      isValid = false;
    }

    // Validate 'recetaMedica.medicamentos' - At least one is mandatory
    if (!medicalRecordData.recetaMedica.medicamentos.length) {
      errors.push("Debe agregar al menos un medicamento en la receta.");
      isValid = false;
    }

    // Set error message
    if (!isValid) {
      const errorMessage = errors.join(" ");
      setErrorMessageMedicalRecordForm(errorMessage);
      toast.error(errorMessage);
    } else {
      setErrorMessageMedicalRecordForm("");
    }

    return isValid;
  };

  return {
    medicalRecordData,
    errorMessageMedicalRecordForm,
    setMedicalRecordData,
    validateMedicalRecordForm,
  };
};

export default useMedicalRecordForm;
