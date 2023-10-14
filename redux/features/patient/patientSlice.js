import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idPaciente: -1,
  patients: [], // Assuming you want to store an array of patients
  loading: false, // Assuming you want to track loading state
};

export const patientStateSlice = createSlice({
  name: "patientState",
  initialState,
  reducers: {
    setPatientState: (state, action) => {
      return action.payload;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPatientState, setPatients, setLoading } =
  patientStateSlice.actions;

export default patientStateSlice.reducer;
