import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export const triajeService = {

  listarTriajePorFiltro: async (filtro) => {
    try {
      const response = await axiosInstance.post('/admision/post/listarTriajePorFiltro', {
        pv_filtro: filtro
      });
      return response.data;
    } catch (error) {
      console.error("Error al listar triaje por filtro", error);
      throw error;
    }
  },

  buscarTriaje: async (filtro) => {
    try {
      const response = await axiosInstance.post('/admision/post/buscarTriaje', {
        pv_filtro: filtro
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar triaje", error);
      throw error;
    }
  },

  actualizarTriaje: async (data) => {
    try {
        const response = await axiosInstance.put('/admision/put/actualizarTriaje', data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar triaje", error);
        throw error;
    }
  }
};
