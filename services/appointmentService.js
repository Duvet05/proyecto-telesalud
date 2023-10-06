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
};
