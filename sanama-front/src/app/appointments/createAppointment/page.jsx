"use client"
import TitleWithIcon from "@/components/TitleWithIcon"
import createAppointmentIcon from "@/components/icons/createAppointmentIcon"
import PatientForm from "@/components/appointments/create/PatientForm"
import AppointementForm from "@/components/appointments/create/AppointementForm"
import { useRouter } from "next/navigation"
import { useState } from "react"
import usePatientForm from "@/hooks/usePatientForm"
import useAppointmentForm from "@/hooks/useAppointmentForm"
import { appointmentService } from "@/services/appointmentService"
import { patientService } from "@/services/patientService"
import { toast } from "sonner"
import { differenceInYears, format } from "date-fns"
import { MdArrowBack } from 'react-icons/md';
const CreateAppointmentForm = () => {
  const router = useRouter()
  const [allFormComplete, setAllFormComplete] = useState(false)

  const { validatePatientForm, patientFormComplete, setPatientFormComplete, patientForm, setPatientForm,
    fechaNacimiento, setFechaNacimiento, sexo, setSexo } = usePatientForm()

  const {
    patientId, setPatientId, doctorId, setDoctorId,
    legalResponsibilityForm, setLegalResponsibilityForm, schedule, setSchedule, triageRequirement, setTriageRequirement,
    validateAppointmentForm, setAppointmentFormComplete,
  } = useAppointmentForm()

  const loadingRegister = async (data) => {
    console.log(data)
    await appointmentService.registrarCita(data)
    router.push("/appointments")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateAppointmentForm(fechaNacimiento, validatePatientForm)) {
      console.log("El formulario es válido. Enviar datos.")
      setAllFormComplete(true)
    } else {
      console.log("No se han completado correctamente los campos.")
      setAllFormComplete(false)
      return
    }

    if (patientId.idPersona == -1) {
      try {
        const patientData = {
          nombres: patientForm.nombres,
          apellidoPaterno: patientForm.apellidoPaterno,
          apellidoMaterno: patientForm.apellidoMaterno,
          dni: patientForm.dni,
          fechaNacimiento: fechaNacimiento,
          sexo: sexo.charAt(0),
          telefono: patientForm.telefono,
          estado: 1,
          codigoSeguro: patientForm.codigoSeguro,
          tipoSeguro: patientForm.tipoSeguro,
          direccion: patientForm.direccion,
          correo: patientForm.correo,
        }

        const patientResponse = await patientService.registrarPaciente(patientData)

        if (patientResponse === -2) {
          toast.error("El DNI del paciente ya se encuentra en nuestro sistema. Revisar datos.")
          return
        }
        if (patientResponse !== null || patientResponse !== -1) {

          const newPatientId = patientResponse

          setPatientId({ idPersona: newPatientId })

          const appointmentFormData = {
            paciente: { idPersona: newPatientId },
            medico: doctorId,
            horaCita: schedule.hora,
            fechaCita: schedule.fecha,
            tieneAcompanhante: legalResponsibilityForm.tieneAcompañante === "Si" ? true : false,
            nombreAcompanhante: legalResponsibilityForm.tieneAcompañante === "Si"
              ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}` : null,
            dniAcompanhante: legalResponsibilityForm.tieneAcompañante === "Si" ? legalResponsibilityForm.dni : null,
            parentezco: legalResponsibilityForm.tieneAcompañante === "Si" ? legalResponsibilityForm.parentesco : null,
            requiereTriaje: triageRequirement === "Si" ? 1 : 0,
          }

          console.log("Paciente registrado y cita registrada")
          toast.promise(() => loadingRegister(appointmentFormData), {
            loading: "Registrando paciente y cita",
            success: "Paciente y cita registrados",
            error: "Error al registrar paciente y cita",
          })
        } else {
          console.log("Error al registrar paciente y cita")
          toast.error("Error al registrar paciente y cita")
        }
      } catch (error) {
        console.log(
          "Error en la respuesta del servidor para registrar un paciente y cita"
        )
        toast.error(
          "Error en la respuesta del servidor para registrar un paciente y cita"
        )
      }
    } else {
      try {
        const appointmentFormData = {
          paciente: patientId,
          medico: doctorId,
          horaCita: schedule.hora,
          fechaCita: schedule.fecha,
          tieneAcompanhante: legalResponsibilityForm.tieneAcompañante === "Si" ? true : false,
          nombreAcompanhante:
            legalResponsibilityForm.tieneAcompañante === "Si"
              ? `${legalResponsibilityForm.nombres} ${legalResponsibilityForm.apellidoPaterno} ${legalResponsibilityForm.apellidoMaterno}`
              : null,
          dniAcompanhante: legalResponsibilityForm.tieneAcompañante === "Si" ? legalResponsibilityForm.dni : null,
          parentezco:
            legalResponsibilityForm.tieneAcompañante === "Si" ? legalResponsibilityForm.parentesco : null,
          requiereTriaje: triageRequirement === "Si" ? 1 : 0,
        }

        toast.promise(() => loadingRegister(appointmentFormData), {
          loading: "Registrando cita",
          success: "Cita registrada",
        })
      } catch (error) {
        toast.error("Error al registrar cita para un paciente existente")
        console.log("Error al registrar cita para un paciente existente")
      }
    }
  }

  return (
    <section className="">
      <div className="flex justify-end ">
        <div className="flex-end">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
            onClick={() => router.back()}
          >
            <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
            Volver
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <TitleWithIcon name={"Nueva cita"} Icon={createAppointmentIcon} />

        <PatientForm
          formComplete={patientFormComplete}
          setFormComplete={setPatientFormComplete}
          setPatientId={setPatientId}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
          fechaNacimiento={fechaNacimiento}
          setFechaNacimiento={setFechaNacimiento}
          sexo={sexo}
          setSexo={setSexo}
          setLegalResponsibilityForm={setLegalResponsibilityForm}
        />

        <hr className="bg-gray-600 mt-20" />

        <AppointementForm
          setFormComplete={setAppointmentFormComplete}
          legalResponsibilityForm={legalResponsibilityForm}
          setLegalResponsibilityForm={setLegalResponsibilityForm}
          setDoctorId={setDoctorId}
          schedule={schedule}
          setSchedule={setSchedule}
          triageRequirement={triageRequirement}
          setTriageRequirement={setTriageRequirement}
          allFormComplete={allFormComplete}
          setAllFormComplete={setAllFormComplete}
        />

        <div className="flex flex-row-reverse">
          <button
            type="submit"
            onClick={handleSubmit}
            className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
          >
            Registrar cita
          </button>
        </div>
      </form>
    </section>
  )
}
export default CreateAppointmentForm
