import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import patientStateSlice from "./features/patientStateSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    patientState: patientStateSlice,
  },
});

export default store;
