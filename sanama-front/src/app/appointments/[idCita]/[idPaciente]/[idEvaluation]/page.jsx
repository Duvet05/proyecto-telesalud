"use client";
import React from "react";
import { useParams } from "next/navigation";
import usePatientHojaMedicaData from "@/hooks/usePatientHojaMedicaData";
import ReviewFormEvaluation from "@/components/evaluations/review/ReviewFormEvaluation";
import { toast } from "sonner";
import TitleWithIcon from "@/components/TitleWithIcon";
import newMedicalRecord from "@/components/icons/newMedicalRecord";

const ReviewContainerMedicalRecord = ({}) => {
  const params = useParams();
  const idHojaMedica = params.idEvaluation;
  const idPaciente = params.idPaciente;
  const {
    patientData,
    medicalRecordData,
    loading,
    errorMessageMedicalRecordForm,
  } = usePatientHojaMedicaData(idHojaMedica, idPaciente);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (errorMessageMedicalRecordForm) {
    toast.error(errorMessageMedicalRecordForm);
    return <div>Error loading medical record</div>;
  }

  return (
    <section className="p-4 md:p-14">
      <TitleWithIcon name={"Ver Hoja Médica"} Icon={newMedicalRecord} />
      <ReviewFormEvaluation
        patientData={patientData}
        hojaMedicaData={medicalRecordData}
      />
    </section>
  );
};

export default ReviewContainerMedicalRecord;
