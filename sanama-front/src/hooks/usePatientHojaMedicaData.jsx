"use client";
import { useState, useEffect } from "react";
import { attentionService } from "@/services/attentionService";
import { patientService } from "@/services/patientService";

const usePatientHojaMedicaData = (idHojaMedica, idPaciente) => {
  const [medicalRecordData, setMedicalRecordData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loadingMedicalRecord, setLoadingMedicalRecord] = useState(false);
  const [loadingPatientData, setLoadingPatientData] = useState(false);
  const [errorMedicalRecord, setErrorMedicalRecord] = useState("");
  const [errorPatientData, setErrorPatientData] = useState("");
  const loading = loadingMedicalRecord || loadingPatientData;

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      setLoadingMedicalRecord(true);
      try {
        const data = await attentionService.buscarHojaMedicaPaciente(
          idHojaMedica
        );
        setMedicalRecordData(data);
      } catch (error) {
        setErrorMedicalRecord(
          "Error fetching medical record: " + error.message
        );
      } finally {
        setLoadingMedicalRecord(false);
      }
    };
    fetchMedicalRecord();
  }, [idHojaMedica]);

  useEffect(() => {
    const fecthPatientData = async () => {
      setLoadingPatientData(true);
      try {
        const data = await patientService.mostrarPacienteRegistrado(idPaciente);
        setPatientData(data);
      } catch (error) {
        setErrorPatientData("Error fetching patient data: " + error.message);
      } finally {
        setLoadingPatientData(false);
      }
    };
    fecthPatientData();
  }, [idPaciente]);

  return {
    patientData,
    medicalRecordData,
    loading,
    errorMedicalRecord,
    errorPatientData,
  };
};

export default usePatientHojaMedicaData;
