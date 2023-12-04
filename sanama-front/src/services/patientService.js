import axios from "axios"
import connection from "@/config/connection"

const axiosInstance = axios.create({
  baseURL: connection.backend,
})

const ENDPOINTS = {
  REGISTRAR_PACIENTE: "/admision/put/paciente",
  BUSCAR_PACIENTE_POR_FILTRO: "/admision/post/buscarPaciente",
  LISTAR_CITAS_POR_PACIENTE: "/admision/post/listarCitasPorPaciente",
  MOSTRAR_PACIENTE_REGISTRADO: "/admision/post/mostrarPacienteRegistrado",
  BUSCAR_PACIENTE_MODAL: "/admision/post/buscarPacienteModal",
  LISTAR_PARENTESCOS: "/configuracion/get/listarParentezcos",
  LISTAR_SEGUROS: "/configuracion/get/listarSeguros",
  BUSCAR_HISTORIAL_CLINICO: "/atencion/post/buscarHistorialClinico",
  REGISTRAR_HOJA_MEDICA: "/atencion/post/registrarNuevaHojaMedica",
  BUSCAR_DATOS_PACIENTE_TRIAGE: "/atencion/post/buscarTriajeCitaHojaMedica",
}

export const patientService = {
  registrarPaciente: async (patientForm) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.REGISTRAR_PACIENTE,
        patientForm
      )
      return response.data
    } catch (error) {
      console.error("Error al registrar los datos del paciente", error)
      throw error
    }
  },


  modificarPaciente: async (params) => {
    try {
      const response = await axiosInstance.put(
        "/admision/put/actualizarPacienteShort",
        params
      )
      return response.data
    } catch (error) {
      console.error("Error al modificar los datos del paciente", error)
      throw error
    }
  },

  buscarPorFiltro: async (filtro) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_PACIENTE_POR_FILTRO,
        {
          pv_filtro: filtro,
        }
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
        ENDPOINTS.LISTAR_CITAS_POR_PACIENTE,
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

  mostrarPacienteRegistrado: async (idPaciente) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.MOSTRAR_PACIENTE_REGISTRADO,
        {
          pn_id_paciente: idPaciente,
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al llenar los datos del modal", error)
      throw error
    }
  },

  buscarHojaMedica: async (idHistorial) => {
    try {
      const response = await axiosInstance.post("/atencion/post/buscarResultadosPaciente",
        {
          pn_id_hoja_medica: idHistorial
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al buscar el historial clínico", error)
      throw error
    }
  },

  buscarPacienteModal: async (filtro) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_PACIENTE_MODAL,
        {
          pv_nombre_dni: filtro,
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al llenar los datos del modal", error)
      throw error
    }
  },

  listarParentescos: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_PARENTESCOS)
      return response.data
    } catch (error) {
      console.error("Error al listar los parentescos", error)
      throw error
    }
  },

  listarSeguros: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_SEGUROS)
      return response.data
    } catch (error) {
      console.error("Error al listar los seguros", error)
      throw error
    }
  },

  buscarHistorialClinico: async (idPaciente) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_HISTORIAL_CLINICO,
        {
          pn_id_paciente: idPaciente,
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al buscar el historial clínico", error)
      throw error
    }
  },

  registrarHojaMedica: async (params) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.REGISTRAR_HOJA_MEDICA,
        params
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Error al registrar el historial clínico", error)
      throw error
    }
  },

  buscarTriageCitaHojaMedica: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_DATOS_PACIENTE_TRIAGE,
        {
          pn_id_cita,
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al buscar cita", error.message)
      throw new Error("Failed to list filtered appointments")
    }
  },
}
