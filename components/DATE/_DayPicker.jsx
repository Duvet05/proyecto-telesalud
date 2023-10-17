import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse } from "date-fns";
import { appointmentService } from "@/services/appointmentService"; // Adjust the path if necessary

function DayPicker(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    appointmentService
      .getDaysAvailable(
        props.selectedDay,
        props.selectedAppointmentType,
        props.providerId
      )
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching available days:", error));
  }, [props.selectedDay && props.selectedDay.getMonth()]);

  const highlightDates =
    data && data.days_available
      ? data.days_available.map((day) => parse(day, "yyyy-MM-dd", new Date()))
      : [];

  return (
    <div className="embeddable-book-cal-container">
      <DatePicker
        inline
        useWeekdaysShort={true}
        onMonthChange={(e) => props.setSelectedDay(e)}
        onChange={(e) => props.setSelectedDay(e)}
        selected={props.selectedDay}
        highlightDates={highlightDates}
      />
    </div>
  );
}

export default DayPicker;
