import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const laboratoryService = {
  searchOrders: async (doctorForm) => {
    try {
      const response = await axiosInstance.put("/rrhh/put/doctor", doctorForm);
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
      throw error;
    }
  },
};
