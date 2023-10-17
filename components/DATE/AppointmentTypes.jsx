import React, { useEffect, useState } from "react";
import AppointmentTypeOption from "./_AppointmentTypeOption";
import { appointmentService } from "@/services/appointmentService";

function AppointmentTypes(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    appointmentService
      .getAppointmentTypes(props.providerId)
      .then((result) => setData(result))
      .catch((error) =>
        console.error("Error fetching appointment types:", error)
      );
  }, []);

  const apptReadyToConfirm = !!(
    props.selectedAppointmentType && props.selectedContactType
  );

  return (
    <div className="appointment-types-container">
      <div className="embedded-appointment-type-container__title">
        Select Appointment Type
      </div>
      {data.map((item) => (
        <AppointmentTypeOption
          key={item.id}
          appointmentType={item}
          selectedAppointmentType={props.selectedAppointmentType}
          setAppointmentType={props.setAppointmentType}
          selectedContactType={props.selectedContactType}
          setContactType={props.setContactType}
        />
      ))}
      <span className="confirm-appt-type-button-box">
        <button
          className="sw-button primary-button confirm-appt-type-button"
          disabled={!apptReadyToConfirm}
          onClick={props.moveToNextStep}
        >
          Confirm Appointment Type
        </button>
      </span>
    </div>
  );
}

export default AppointmentTypes;
