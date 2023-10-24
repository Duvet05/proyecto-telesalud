import axios from "axios"

const connection = {
    backend: "http://localhost:8080"
}

const axiosInstance = axios.create({
    baseURL: connection.backend,
})

export const patientService = {
    insertar: async (patientForm) => {
        try {
            const response = await axiosInstance.put(
                "/admision/put/paciente",
                patientForm
            )
            return response.data
        } catch (error) {
            console.error("Error al insertar los datos del paciente", error)
            throw error
        }
    },

    //Si no hay filtro, es un listar.
    //Si hay filtro, es decir, para la busqueda, se usa el filtro.
    buscarPorFiltro: async (filtro) => {
        try {
            const response = await axiosInstance.post(
                "/admision/post/buscarPacientePrueba",
                { pv_filtro: filtro }
            )
            return response.data
        } catch (error) {
            console.error("Error al buscar paciente por filtro", error)
            throw error
        }
    },

    listarCitasPorPaciente: async (idPaciente) => {
        try {
            const response = await axiosInstance.post(
                "/admision/post/listarCitasPorPaciente",
                {
                    pn_paciente: idPaciente,
                }
            )
            return response.data
        } catch (error) {
            console.error("Error al listar las citas del paciente", error)
            throw error
        }
    },
}
