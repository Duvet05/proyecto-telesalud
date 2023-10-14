import { combineReducers } from "@reduxjs/toolkit";
import appointmentReducer from "./features/appointment/appointmentSlice";
import patientReducer from "./features/patient/patientSlice";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  patient: patientReducer,
});

export default rootReducer;
