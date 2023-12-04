"use client"
import { useState } from "react"
import { toast } from "sonner"

const useAppointmentForm = () => {
    const [patientId, setPatientId] = useState({
        idPersona: -1
    })

    const [doctorId, setDoctorId] = useState({
        idPersona: -1
    })

    const [legalResponsibilityForm, setLegalResponsibilityForm] = useState({
        tieneAcompañante: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        parentesco: '',
    })

    const [schedule, setSchedule] = useState({
        fecha: '',
        hora: '',
    })

    const [triageRequirement, setTriageRequirement] = useState('Si')
    const [appointmentFormComplete, setAppointmentFormComplete] = useState(false)
    const [errorMessageAppointmentForm, setErrorMessageAppointmentForm] = useState("")


    const validateAppointmentForm = (fechaNacimiento, validatePatientForm) => {
        if (!validatePatientForm()) return false

        if (schedule.fecha === "" || schedule.hora === "") {
            setErrorMessageAppointmentForm("Por favor, complete todos los campos para reservar la cita")
            setAppointmentFormComplete(false)
            toast.error("Por favor, complete todos los campos para reservar la cita")
            return false
        }

        if (legalResponsibilityForm.tieneAcompañante === "Si") {
            const legalResponsibilityFormValues = Object.values(legalResponsibilityForm)
            if (legalResponsibilityFormValues.includes("")) {
                toast.error("Por favor, completa todos los campos de responsabilidad legal.")
                setErrorMessageAppointmentForm("Por favor, completa todos los campos de responsabilidad legal.")
                setAppointmentFormComplete(false)
                return false
            }
        }

        if (triageRequirement === "") {
            toast.error("Por favor, selecciona un nivel de triaje.")
            setErrorMessageAppointmentForm("Por favor, selecciona un nivel de triaje.")
            setAppointmentFormComplete(false)
            return false
        }

        setErrorMessageAppointmentForm("")
        setAppointmentFormComplete(true)
        return true
    }

    return {
        patientId,
        setPatientId,
        doctorId,
        setDoctorId,
        legalResponsibilityForm,
        setLegalResponsibilityForm,
        schedule,
        setSchedule,
        triageRequirement,
        setTriageRequirement,
        appointmentFormComplete,
        setAppointmentFormComplete,
        errorMessageAppointmentForm,
        validateAppointmentForm,
    }
}

export default useAppointmentForm