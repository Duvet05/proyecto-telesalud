import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const doctorService = {
  insertar: async (doctorForm) => {
    try {
      const response = await axiosInstance.put("/rrhh/put/doctor", doctorForm);
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
      throw error;
    }
  },

  listar: async (doctorRequest) => {
    try {
      const response = await axiosInstance.get("/rrhh/get/doctores");
      return response.data;
    } catch (error) {
      console.error("Error al listar los doctores", error);
      throw error;
    }
  },

  buscarPorNombre: async (name) => {
    try {
      const response = await axiosInstance.post("/rrhh/post/buscarMedico", {
        pv_filtro: name,
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por nombre", error);
      throw error;
    }
  },

  listarEspecialidades: async () => {
    try {
      const response = await axiosInstance.get("/rrhh/get/especialidad");
      return response.data;
    } catch (error) {
      console.error("Error al listar las especialidades", error);
      throw error;
    }
  },

  buscarDoctoresPorEspecialidad: async (especialidad) => {
    try {
      const response = await axiosInstance.post("/rrhh/post/medicoNombre", {
        pv_medico: "",
        pv_especialidad: especialidad,
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por especialidad", error);
      throw error;
    }
  },
};
