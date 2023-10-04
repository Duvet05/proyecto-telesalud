import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const patientService = {
  insertar: async (patientForm) => {
    try {
      const response = await axiosInstance.put(
        "/admision/put/paciente",
        patientForm
      );
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del paciente", error);
      throw error;
    }
  },

  listar: async (patientRequest) => {
    try {
      const response = await axiosInstance.get("/admision/get/paciente");
      return response.data;
    } catch (error) {
      console.error("Error al listar los pacientes", error);
      throw error;
    }
  },

  buscarPorNombre: async (name) => {
    try {
      const response = await axiosInstance.post(
        "/admision/post/buscarPaciente",
        { pv_filtro: name }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar pacientes por nombre", error);
      throw error;
    }
  },
};
