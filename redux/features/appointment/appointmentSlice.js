import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    newPatientData: null,
    selectedPatientData: null,
    companionData: null,
    selectedDoctor: null,
    selectedTriage: null,
    selectedDate: null,
    selectedHour: null,
    availableHours: [],
    availableDays: [],
  },
  reducers: {
    setAppointmentData: (state, action) => {
      state.newPatientData = action.payload.newPatientData;
    },
  },
});

export const { setAppointmentData } = appointmentSlice.actions;
export default appointmentSlice.reducer;
