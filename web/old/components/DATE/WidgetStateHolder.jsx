import React, { useState } from "react";
import AppointmentTypes from "./AppointmentTypes";
import DateTimeSelector from "./DateTimeSelector";
import ContactInfoForm from "./ContactInfoForm";
import CompletedBookingInfo from "./_CompletedBookingInfo";
import EmbeddableHeader from "./_EmbeddableHeader";

function WidgetStateHolder(props) {
  const hardcodedSteps = [
    {
      id: "select_appt_type",
      name: "Select Appointment Type",
      component: AppointmentTypes,
    },
    {
      id: "select_date_time",
      name: "Select Date and Time",
      component: DateTimeSelector,
    },
    {
      id: "your_information",
      name: "Provide Your Information",
      component: ContactInfoForm,
    },
  ];

  const [steps] = useState(hardcodedSteps);
  const [selectedAppointmentType, setAppointmentType] = useState();
  const [selectedContactType, setContactType] = useState();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState();
  const [bookedAppointment, setBookedAppointment] = useState();

  const currentStep = steps[stepIndex];

  if (!currentStep) {
    return null;
  }

  if (bookedAppointment) {
    return <CompletedBookingInfo bookedAppointment={bookedAppointment} />;
  }

  const commonProps = {
    selectedAppointmentType,
    selectedContactType,
    selectedSlot,
    providerId: props.providerId,
    moveToNextStep: () => setStepIndex(stepIndex + 1),
    setAppointmentType,
    setContactType,
    setSelectedSlot,
    setBookedAppointment,
  };

  return (
    <>

    </>
  );
}

export default WidgetStateHolder;
