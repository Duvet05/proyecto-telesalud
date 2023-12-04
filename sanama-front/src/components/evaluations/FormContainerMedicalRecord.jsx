// FormContainerMedicalRecord.js
import React, { useState } from "react";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import FormEvaluation from "./FormEvaluation";
import { toast } from "sonner";
import { patientService } from "@/services/patientService";
import swal from "sweetalert";
import { SignatureModal } from "../signature/SignatureModal";
import ViewSignature from "../signature/ViewSignature";
import { useRouter } from "next/navigation";

const FormContainerMedicalRecord = ({
  defaultTriaje,
  idCita,
  updateAppointmentStatus,
}) => {
  const router = useRouter();
  const { medicalRecordData, setMedicalRecordData, validateMedicalRecordForm } =
    useMedicalRecordForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [signatureURL, setSignatureURL] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmSignature = (url) => {
    setSignatureURL(url);
    setShowModal(false);
  };

  const resetSignature = () => {
    setSignatureURL(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateMedicalRecordForm()) {
      console.log(medicalRecordData);
      setIsSubmitting(false);
      return;
    }
    swal({
      title: "¿Estás seguro?",
      text: "Estás a punto de registrar esta atención médica.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willConfirm) => {
      if (willConfirm) {
        setIsSubmitting(true);
        try {
          await patientService.registrarHojaMedica(medicalRecordData);
          toast.success("Atención registrada con éxito.");
          await updateAppointmentStatus(idCita, 1);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error al registrar. Intente de nuevo.");
        } finally {
          setIsSubmitting(false);
          router.back();
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max w-full">
      <FormEvaluation
        defaultTriaje={defaultTriaje}
        setMedicalRecordData={setMedicalRecordData}
      />

      {signatureURL && (
        <ViewSignature url={signatureURL} onCancel={resetSignature} />
      )}

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          disabled={isSubmitting}
          className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          {isSubmitting ? "Registrando..." : "Registrar Evaluaciòn"}
        </button>
        <button
          type="button"
          onClick={handleOpenModal}
          className="m-2 text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 
          font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Agregar Firma
        </button>
      </div>

      <SignatureModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSignature}
      />
    </form>
  );
};

export default FormContainerMedicalRecord;
