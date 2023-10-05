import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const medicService = {
  insertar: async (doctorForm) => {
    try {
      const response = await axiosInstance.put("/rrhh/put/doctor", doctorForm);
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
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

  buscarPorEspecialidad: async (especialidad) => {
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

  buscarHorariosByID: async (fecha, medicId) => {
    try {
      const response = await axiosInstance.post(
        "/rrhh/post/horarios_por_medico_y_fecha",
        {
          pn_id_medico: medicId,
          pd_fecha: fecha,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar doctores por especialidad", error);
      throw error;
    }
  },
};
