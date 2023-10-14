import { combineReducers } from "@reduxjs/toolkit";
import appointmentReducer from "./features/appointment/appointmentSlice";
import patientReducer from "./features/patient/patientSlice";
import appStateReducer from "./features/appStateSlice";
const rootReducer = combineReducers({
  appointment: appointmentReducer,
  patient: patientReducer,
  appState: appStateReducer,
});

export default rootReducer;
