import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const patientService = {
  create: async (patientData) => {
    try {
      const response = await axiosInstance.put(
        "/admision/put/paciente",
        patientData
      );
      return response.data; // Suponiendo que el ID del paciente creado se devuelve en la respuesta
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        throw new Error(error.response.data.message || error.message);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        throw new Error("No se recibió respuesta del servidor");
      } else {
        // Algo sucedió al configurar la petición y provocó un error
        throw new Error(error.message);
      }
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

  buscarPorFiltro: async (filtro) => {
    try {
      const response = await axiosInstance.post(
        "/admision/post/buscarPaciente",
        { pv_filtro: filtro }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar paciente por filtro", error);
      throw error;
    }
  },

  listarCitasPorPaciente: async (idPaciente) => {
    try {
      const response = await axiosInstance.post(
        "/admision/post/listarCitasPorPaciente",
        {
          pn_paciente: idPaciente,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas del paciente", error);
      throw error;
    }
  },
};
