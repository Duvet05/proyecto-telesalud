import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  LISTAR_TRIAJE_POR_FILTRO: "/admision/post/listarTriajePorFiltro",
  BUSCAR_TRIAJE_POR_FILTRO: "/admision/post/buscarTriaje",
  ACTUALIZAR_TRIAJE: "/admision/put/actualizarTriaje",
  ELIMINAR_TRIAJE: "/admision/put/eliminarTriaje",
};

export const triajeService = {
  listarTriajePorFiltro: async (request) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.LISTAR_TRIAJE_POR_FILTRO, 
        request        
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar el triaje por filtro", error);
      throw error;
    }
  },

  buscarPorFiltro: async (idTriaje) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BUSCAR_TRIAJE_POR_FILTRO,
        {
          pv_filtro: idTriaje,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar triaje por filtro", error);
      throw error;
    }
  },

  actualizarTriaje: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.ACTUALIZAR_TRIAJE,
        data
      );
      return 1;
    } catch (error) {
      console.error("Error al actualizar el triaje", error);
      throw error;
    }
  },

  eliminarTriaje: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.ELIMINAR_TRIAJE,
        data
      );
      return 1;
    } catch (error) {
      console.error("Error al eliminar el triaje", error);
      throw error;
    }
  },
};
