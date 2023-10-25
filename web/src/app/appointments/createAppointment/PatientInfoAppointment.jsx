import React, { useState, useEffect } from "react";
import PatientSearchAppointment from "./PatientSearchAppointment";
import PatientFieldsAppointment from "./PatientFieldsAppointment";
import LegalResponsibility from "./LegalResponsibility";
import { patientService } from "@/services/patientService";
import { useAppointments } from "@/context/AppointmentsContext";

function InformacionDelPaciente() {
  const [formData, setFormData] = useState({
    hasCompanion: "no",
    isEditing: false,
    allPatients: [],
    showFields: false,
    error: null,
  });

  const { appointmentData, setAppointmentData } = useAppointments();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await patientService.listar();
        setFormData((prevData) => ({ ...prevData, allPatients: data }));
      } catch (err) {
        console.error("Error al obtener la lista de pacientes:", err);
        setFormData((prevData) => ({
          ...prevData,
          error: "Error al obtener la lista de pacientes",
        }));
      }
    }
    fetchPatients();
  }, []);

  const handlePatientSelect = (value) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      selectedPatientData: value,
    }));

    setFormData((prevData) => ({
      ...prevData,
      showFields: true,
      isEditing: false,
    }));
  };

  const handleAddPatientClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      showFields: true,
      isEditing: true,
    }));
  };

  const handleCancelClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      showFields: false,
      isEditing: false,
    }));
  };

  const handlePatientFormDataChange = (updatedFormData) => {
    if (formData.isEditing) {
      setAppointmentData((prevData) => ({
        ...prevData,
        newPatientData: updatedFormData,
      }));
    } else {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedPatientData: updatedFormData,
      }));
    }
  };

  return (
    <div className="p-2 bg-white">
      {formData.error && <p className="text-red-500">{formData.error}</p>}

      <div className="grid gap-3">
        <div className="col-span-12">
          <PatientSearchAppointment
            allPatients={formData.allPatients}
            onSelect={handlePatientSelect}
            onAdd={
              formData.isEditing ? handleCancelClick : handleAddPatientClick
            }
            isEditing={formData.isEditing}
            disabled={formData.isEditing}
          />
        </div>

        {(formData.showFields || !formData.isEditing) && (
          <>
            <div className="col-span-12">
              <div className="border-t border-gray-200 my-3" />
            </div>

            <div className="col-span-12">
              <PatientFieldsAppointment
                isDisabled={!formData.isEditing}
                patientData={appointmentData.selectedPatientData}
                onFormDataChange={handlePatientFormDataChange} // Pass the callback here
              />
            </div>

            <LegalResponsibility />
          </>
        )}
      </div>
    </div>
  );
}

export default InformacionDelPaciente;
