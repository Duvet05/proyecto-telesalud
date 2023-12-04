'use client'
import { useState } from 'react'

const useTriajeData = () => {
    const [triajeData, setTriajeData] = useState({
        codigoTriaje: '',
        peso: '',
        talla: '',
        temperatura: '',
        motivoVisita: '',

        presionSistolica: '',
        presionDiastolica: '',

        estado: '',
        prioridad: '',
        fechaTriaje: '',
        horaTriaje: '',
        saturacionOxigeno: '',
        frecuenciaCardiaca: '',

        nivelConciencia: '',

        glasgow: '',
        eyesOpen: '',
        talkingCorrectly: '',
        ableToMoveBody: '',

        nivelDolor: '',
        condicionesPrexistentes: '',
        paciente: {
            idPersona: '',
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            dni: '',
            fechaNacimiento: '',
            sexo: '',
        },
    })

    return {
        triajeData,
        setTriajeData,
    }
}

export default useTriajeData
