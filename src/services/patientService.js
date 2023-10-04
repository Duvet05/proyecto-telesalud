import axios from "axios"
import connection from "../configs/connection"
const axiosInstance = axios.create({
  baseURL: connection.backend
})

export const patientService = {
  insertar: async (patientForm) => {
    try {
      //Esto debe de ser post, culpo al back
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

  listar: async (patientRequest) => {
    //Deserializar objeto request
    try {
      const response = await axiosInstance.get("/admision/get/paciente")
      return response.data
    } catch (error) {
      console.error("Error al insertar los datos del paciente", error)
      throw error
    }
  }
}
