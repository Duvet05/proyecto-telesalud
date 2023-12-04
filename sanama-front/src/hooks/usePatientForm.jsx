import { useState } from 'react'
import { toast } from 'sonner'

const usePatientForm = () => {
    const [patientForm, setPatientForm] = useState({
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        tipoSeguro: '',
        codigoSeguro: '',
        dni: '',
        direccion: '',
        telefono: '',
        correo: ''
    })

    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [sexo, setSexo] = useState('')

    const [patientFormComplete, setPatientFormComplete] = useState(false)
    const [errorMessagePatientForm, setErrorMessagePatientForm] = useState("")

    const validatePatientForm = () => {
        const patientFormValues = Object.values(patientForm)
        if (patientFormValues.includes("") || !fechaNacimiento || !sexo) {
            setErrorMessagePatientForm("Por favor, complete todos los campos del paciente")
            toast.error("Por favor, complete todos los campos del paciente")
            return false
        }
        setErrorMessagePatientForm("")
        setPatientFormComplete(true)
        // setIsFormEnabled(false)
        return true
    }

    return {
        validatePatientForm,
        patientFormComplete,
        setPatientFormComplete,
        errorMessagePatientForm,
        patientForm,
        setPatientForm,
        fechaNacimiento,
        setFechaNacimiento,
        sexo,
        setSexo
    }
}

export default usePatientForm
