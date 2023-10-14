import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idAppointment: -1,
  fecha: null,
  idMedico: -1,
};

export const appointmentSlice = createSlice({
  name: "appointment", // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    setAppointment: (state, action) => {
      state.idAppointment = action.payload.idAppointment;
      state.fecha = action.payload.fecha;
      state.idMedico = action.payload.idMedico;
    },
    // Si necesitas más reducers, puedes agregarlos aquí. Por ejemplo:
    // clearAppointment: (state) => {
    //   state.idAppointment = -1;
    //   state.fecha = null;
    //   state.idMedico = -1;
    // },
  },
});

export const { setAppointment /* , clearAppointment */ } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
