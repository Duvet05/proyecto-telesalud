import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idPaciente: -1,
};

export const patientStateSlice = createSlice({
  name: "patientState",
  initialState,
  reducers: {
    setPatientState: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPatientState } = patientStateSlice.actions;

export default patientStateSlice.reducer;
