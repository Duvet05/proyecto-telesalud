import React, { useEffect, useState } from "react";
import AppointmentTypes from "./AppointmentTypes";
import DateTimeSelector from "./DateTimeSelector";
import ContactInfoForm from "./ContactInfoForm";
import CompletedBookingInfo from "./_CompletedBookingInfo";
import EmbeddableHeader from "./_EmbeddableHeader";
import { appointmentService } from "@/services/appointmentService";

function WidgetStateHolder(props) {
  const [steps, setSteps] = useState([]);
  const [selectedAppointmentType, setAppointmentType] = useState();
  const [selectedContactType, setContactType] = useState();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState();
  const [bookedAppointment, setBookedAppointment] = useState();

  useEffect(() => {
    appointmentService
      .getBookingSteps(props.providerId)
      .then((steps) => setSteps(steps))
      .catch((error) => console.error("Error fetching booking steps:", error));
  }, []);

  const currentStep = steps[stepIndex];

  if (!currentStep) {
    return null;
  }

  if (bookedAppointment) {
    return <CompletedBookingInfo bookedAppointment={bookedAppointment} />;
  }

  if (currentStep.id === "select_appt_type") {
    return (
      <>
        <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"}
        />
        <AppointmentTypes
          selectedAppointmentType={selectedAppointmentType}
          selectedContactType={selectedContactType}
          setContactType={setContactType}
          providerId={props.providerId}
          setAppointmentType={setAppointmentType}
          moveToNextStep={() => setStepIndex(stepIndex + 1)}
        />
      </>
    );
  }

  if (currentStep.id === "select_date_time") {
    return (
      <>
        <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"}
        />
        <DateTimeSelector
          selectedAppointmentType={selectedAppointmentType}
          providerId={props.providerId}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          moveToNextStep={() => setStepIndex(stepIndex + 1)}
        />
      </>
    );
  }

  if (currentStep.id === "your_information") {
    return (
      <>
        <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"}
        />
        <ContactInfoForm
          selectedAppointmentType={selectedAppointmentType}
          selectedSlot={selectedSlot}
          selectedContactType={selectedContactType}
          moveToNextStep={() => setStepIndex(stepIndex + 1)}
          setBookedAppointment={setBookedAppointment}
        />
      </>
    );
  }

  return null;
}

export default WidgetStateHolder;
