import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const laboratoryService = {
  searchOrders: async (doctorForm) => {
    try {
      const response = await axiosInstance.post("/laboratorio/post/listarOrdenLaboratorioFiltro", {
        "pv_filtro": doctorForm,
        "pd_fecha_inicio": null,
        "pd_fecha_fin": null
      });
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
      throw error;
    }
  },
  listarMedicosLab: async () => {
    try {
      const response = await axiosInstance.get("/configuracion/get/listarMedicosLab");
      return response.data;
    } catch (error) {
      console.error("Error al insertar los datos del doctor", error);
      throw error;
    }
  },
};

