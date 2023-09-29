import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function SchedulePage() {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Consulta con Dr. Smith",
    },
    // ... más eventos
  ]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={(slotInfo) => {
          const newEvent = {
            start: slotInfo.start,
            end: slotInfo.end,
            title: "Nuevo turno",
          };
          setEvents((prevEvents) => [...prevEvents, newEvent]);
        }}
      />
    </div>
  );
}

export default SchedulePage;
