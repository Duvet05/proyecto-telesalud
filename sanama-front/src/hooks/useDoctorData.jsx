"use client"
import { useState } from "react"

const useDoctorData = () => {
    const [doctorData, setDoctorData] = useState({
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        dni: '',
        fechaNacimiento: false,
        sexo: '',
        telefono: '',
        correo: '',
        area: '',
        cmp: '',
        especialidad: '',
        fotoPerfil: null
    })

    return {
        doctorData,
        setDoctorData
    }
}

export default useDoctorData