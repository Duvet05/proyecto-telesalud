import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('es');
const localizer = momentLocalizer(moment);


function SeleccionarHorarioMedico({ onAvailabilitySelected }) {
  const [events, setEvents] = useState([]); //Estado para controlar las horas disponibles
  const [view, setView] = useState("month"); // Estado para controlar la vista
  const [calendarHeight, setCalendarHeight] = useState(600); // Altura 


  const isEventOverlapping = (newEvent) => {
    for (const event of events) {
      if (
        (moment(newEvent.start).isSameOrAfter(event.start) &&
          moment(newEvent.start).isBefore(event.end)) ||
        (moment(newEvent.end).isAfter(event.start) &&
          moment(newEvent.end).isSameOrBefore(event.end))
      ) {
        return true; // Hay superposición
      }
    }
    return false; // No hay superposición
  };

  const handleSelectSlot = (slotInfo) => {
    if (view === "week") {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: "Disponible",
      };

      if (!isEventOverlapping(newEvent)) {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        // Mostrar un mensaje de error o tomar alguna otra acción aquí
        alert(
          "El nuevo turno se superpone con un turno existente. Por favor, seleccione otra hora."
        );
      }
    }
  };
  const handleView = newView => {
    // Ajusta la altura según la vista actual
    setView(newView)
    if (newView === 'week') {
      setCalendarHeight(1200);
    } else if (newView === 'month') {
      setCalendarHeight(600);
    }
  };
  const handleDoubleClickEvent = (event) => {
    // Mostrar un cuadro de diálogo de confirmación para eliminar el evento
    if (view === "month") {
      // const shouldDelete = window.confirm("¿Desea eliminar este evento?");
      // if (shouldDelete) {
      //   // Filtrar los eventos para eliminar el evento si el usuario confirma
      //   const updatedEvents = events.filter((e) => e !== event);
      //   setEvents(updatedEvents);
      // }
    } else {
      const updatedEvents = events.filter((e) => e !== event);
      setEvents(updatedEvents);
    }
  };
  const handleSaveAvailability = () => {
    // Llamar a la función de devolución de llamada del componente padre para pasar la disponibilidad seleccionada
    if (typeof onAvailabilitySelected === "function") {
      onAvailabilitySelected(events);
    }
  };

  return (
    <div style={{ height: "auto" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: calendarHeight }}
        views={{
          month: true,
          week: true,
          agenda: true,
        }}
        formats={{
          dayFormat: "dddd", // Configura los días de la semana en español
        }}
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleDoubleClickEvent} // Manejador para doble clic en eventos
        selectable={view === "week"} // Habilita la selección solo en la vista "Week"
        onView={handleView} // Actualiza el estado de la vista
      />
      {/* <Button variant="contained" onClick={handleSaveAvailability}>
        Guardar Disponibilidad
      </Button> */}
    </div>
  );
}

export default SeleccionarHorarioMedico;
