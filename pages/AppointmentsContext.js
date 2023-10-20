import React, { createContext, useState, useContext } from "react";

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [appointmentData, setAppointmentData] = useState({
    selectedPatientData: null,
    companionData: null,
    selectedMedicData: null,
    selectedTriage: null,
    selectedDate: null,
    selectedHour: null,
    availableHours: [],
    availableDays: [],
  });

  return (
    <AppointmentsContext.Provider
      value={{ appointmentData, setAppointmentData }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      "useAppointments debe ser usado dentro de un AppointmentsProvider"
    );
  }
  return context;
};
