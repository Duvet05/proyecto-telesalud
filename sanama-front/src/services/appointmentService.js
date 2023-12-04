import axios from "axios";
import connection from "@/config/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

const ENDPOINTS = {
  REGISTRAR_CITA: "/admision/post/registrarCitaMedica",
  LISTAR_CITAS: "/admision/get/cita",
  LISTAR_CITAS_MEDICO: "/admision/post/listarCitasPorMedico",
  LISTAR_CITAS_FILTRO: "/admision/post/listarCitasPorFiltro",
  BUSCAR_CITAS: "/admision/post/buscarCitaMedica",
  CAMBIAR_ESTADO: "/admision/post/cambiarEstadoCita",
  CAMBIAR_HORA_FECHA: "/admision/post/cambiarHorarioCita",
  LISTAR_ESTADOS_CITAS: "/configuracion/get/listarEstadosCitas",
  LISTAR_LABORATORIOS: "/atencion/post/buscarResultadosPaciente",
  GET_STATUS_CITA: "/configuracion/post/getStatusCita",
  GET_CODE_MEDICAL_SHEET: "/atencion/post/mostrarCodigoHojaMedicaCita",
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const appointmentService = {

  mostrarCodigoHojaMedicaCita: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.GET_CODE_MEDICAL_SHEET, {
        pn_id_cita,
      });
      return response.data;
    } catch (error) {
      console.error("Error al mostrar el código de la hoja médica: ", error);
      throw error; 
    }
  },

  listarLaboratorios: async (pn_id_hoja_medica) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LISTAR_LABORATORIOS, {
        pn_id_hoja_medica,
      });
      return response.data;
    } catch (error) {
      console.error("Error al listar laboratorios: ", error);
      throw error;
    }
  },

  getStatusCita: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post('/configuracion/post/getStatusCita', {
        pn_id_cita,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener el estado de la cita: ", error);
      throw error;
    }
  },

  registrarCita: async (form) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.REGISTRAR_CITA, form);
      return response.data;
    } catch (error) {
      console.error(
        "Error al realizar la llamada al registro de cita médica:",
        error.message
      );
    }
  },

  listar: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_CITAS);
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas:", error.message);
      throw new Error("Failed to list appointments");
    }
  },

  listarCitasFiltro: async (request) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.LISTAR_CITAS_FILTRO,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas con filtro:", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  getDaysAvailable: async (doctorId) => {
    try {
      const currentDayAndHour = formatDate(new Date());
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Lima";

      const response = await axiosInstance.get("PLACEHOLDER", {
        params: {
          doctorId,
          time: currentDayAndHour,
          timezone,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting available days:", error.message);
      throw new Error("Failed to get available days");
    }
  },

  buscarCita: async (pn_id_cita) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.BUSCAR_CITAS, {
        pn_id_cita,
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar cita", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  actualizarEstadoCita: async (data) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.CAMBIAR_ESTADO, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar estado de la cita", error.message);
      throw new Error("Failed to update appointment status");
    }
  },

  actualizarHoraFecha: async (pn_id_cita, pt_hora_cita, pd_fecha_cita) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.CAMBIAR_HORA_FECHA,
        {
          pn_id_cita,
          pt_hora_cita,
          pd_fecha_cita,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al cambiar hora y fecha de la cita", error.message);
      throw new Error("Failed to update appointment date and time");
    }
  },

  citasMedicoPorID: async (pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,arregloEstados) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LISTAR_CITAS_MEDICO, {
        pn_id_medico, pv_filtro, pd_fecha_inicio, pd_fecha_fin,arregloEstados
      });

      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error al buscar cita", error.message);
      throw new Error("Failed to list filtered appointments");
    }
  },

  listarEstados: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.LISTAR_ESTADOS_CITAS);
      return response.data;
    } catch (error) {
      console.error("Error al listar los estados de las citas", error);
      throw error;
    }
  },
};
