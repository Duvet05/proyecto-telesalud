import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});

export const appointmentService = {
  registrarCita: async ({
    id_cita,
    idPaciente,
    idMedico,
    codigoCitaMedica,
    tipoCita,
    horaCita,
    fechaCita,
    requiereTriaje,
    estado,
  }) => {
    try {
      const response = await axiosInstance.post(
        "/admision/post/registrarCitaMedica",
        {
          id_cita,
          paciente: { idPersona: idPaciente },
          medico: { idPersona: idMedico },
          codigoCitaMedica,
          tipoCita,
          horaCita,
          fechaCita,
          requiereTriaje,
          estado,
        }
      );
      return response.data; // Esto debería devolver el número de la cita.
    } catch (error) {
      console.error("Error al registrar la cita médica", error);
      throw error;
    }
  },

  listar: async (appointmentRequest) => {
    try {
      const response = await axiosInstance.get("/admision/get/cita");
      return response.data;
    } catch (error) {
      console.error("Error al listar las citas", error);
      throw error;
    }
  },

  getBookingSteps: async (providerId) => {
    try {
      const response = await axiosInstance.get("URL_PLACEHOLDER", {
        params: {
          provider_id: providerId,
        },
      });
      return response.data.steps;
    } catch (error) {
      console.error("Error getting booking steps:", error);
      throw error;
    }
  },

  getDaysAvailable: async (doctorId, selectedAppointmentType) => {
    try {
      const currentDate = new Date();

      const currentDayAndHour = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
        2,
        "0"
      )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
      ).padStart(2, "0")}`;

      const response = await axiosInstance.get("PLACEHOLDER", {
        params: {
          doctorId: doctorId,
          time: currentDayAndHour,
          timezone:
            Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Lima",
          appointment_type_id: selectedAppointmentType.id,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting available days:", error);
      throw error;
    }
  },

  getAppointmentTypes: async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v2/appointment_types.json",
        {
          params: {
            clients_can_book: true,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting appointment types:", error);
      throw error;
    }
  },

  getAvailableSlots: async (params) => {
    try {
      const response = await axiosInstance.get(
        "/api/v2/bookings/slots_available.json",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      throw error;
    }
  },
};
