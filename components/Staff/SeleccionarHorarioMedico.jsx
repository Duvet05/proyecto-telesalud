import React, { useState, useEffect } from "react";
import { Calendar, Day, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
moment.locale('es');
const localizer = momentLocalizer(moment);

function combinarEventosContiguos(eventos) {
  // Ordenar los eventos por la propiedad "start" en orden ascendente
  eventos.sort((a, b) => new Date(a.start) - new Date(b.start));

  const eventosCombinados = [];
  let eventoActual = null;

  for (const evento of eventos) {
    if (!eventoActual) {
      eventoActual = evento;
    } else {
      const finEventoActual = new Date(eventoActual.end);
      const inicioEvento = new Date(evento.start);

      if (finEventoActual >= inicioEvento) {
        // Los eventos se superponen o son contiguos, combínalos
        eventoActual.end = new Date(Math.max(finEventoActual, new Date(evento.end)));
      } else {
        // No son contiguos, agrega el evento actual a la lista de eventos combinados
        eventosCombinados.push(eventoActual);
        eventoActual = evento;
      }
    }
  }

  // Agregar el último evento actual (o el único si no hubo combinación)
  if (eventoActual) {
    eventosCombinados.push(eventoActual);
  }

  return eventosCombinados;
}

function convertirDatosParaCalendar(datos) {
  console.log(1);
  console.log(datos);
  const eventos = datos.map((dato) => {
    // Asegúrate de que las fechas y horas estén en el formato adecuado

    const fecha = dato.fecha ? new Date(dato.fecha.replace(/-/g, '/')) : new Date(); // Usamos la fecha actual si fecha es nula

    const horaInicio = new Date(`1970-01-01T${dato.horaInicio}`);
    const horaFin = new Date(`1970-01-01T${dato.horaFin}`);
    // Combina la fecha y la hora de inicio y fin
    console.log(2);
    console.log(dato.fecha);
    
    const start = new Date(fecha);
    start.setHours(horaInicio.getHours());
    start.setMinutes(horaInicio.getMinutes());
    console.log(start);
    
    const end = new Date(fecha);
    end.setHours(horaFin.getHours());
    end.setMinutes(horaFin.getMinutes());
    console.log(end);
    // Crea un evento con las propiedades necesarias para react-big-calendar
    return {
      id: dato.idTurno, // Puedes usar el ID o un identificador único como id
      // title: `Turno ${dato.idTurno}`,
      title: `Disponible`,
      start,
      end,
    };
  });

  // return combinarEventosContiguos(eventos);
  return combinarEventosContiguos(eventos);
}

function SeleccionarHorarioMedico(props) {
  const { doctor } = props;
  //console.log(doctor)

  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month"); // Estado para controlar la vista
  const [calendarHeight, setCalendarHeight] = useState(600); // Altura 
  const fechaHoy = new Date();
  fechaHoy.setDate(fechaHoy.getDate() - 15); // Resta 6 días
  ///
  const handleIngresarDisponibilidad = () => {
    setIsCalendarEnabled(true);
  };
  const handleGuardar = () => {
    // Aquí puedes realizar el envío al servidor con los datos del calendario
    // Por ejemplo, puedes enviar el estado 'events' al servidor
    // Luego, puedes reiniciar el estado del calendario
    const eventosTransformados = events.map((evento) => {
      return {
        pn_id_medico: `${doctor.idPersona}`,
        pt_hora_inicio: evento.start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        pt_hora_fin: evento.end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        pd_fecha: evento.start.toISOString().split("T")[0],
      };
    });

    const url = "http://localhost:8080/rrhh/post/registrarHorarioMedico";

    const registrarEvento = async (evento) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          // La solicitud se completó con éxito, puedes manejar la respuesta aquí
          console.log("Solicitud exitosa");
        } else {
          // La solicitud no se completó con éxito, puedes manejar el error aquí
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    const registrarEventos = async () => {
      for (const evento of eventosTransformados) {
        await registrarEvento(evento);
      }
    };

    // Llama a la función para registrar los eventos
    registrarEventos();
    setIsCalendarEnabled(false);


  };
  ///
  useEffect(() => {
    const obtenerEventos = async () => {
      const eventosTotales = [];
      for (let i = 0; i < 30; i++) {
        fechaHoy.setDate(fechaHoy.getDate());
        const year = fechaHoy.getFullYear();
        const month = fechaHoy.getMonth() + 1;
        const day = fechaHoy.getDate();
        //console.log(`${day} ${month} ${year} `);
        const requestData = {
          pn_id_medico: doctor[0].idPersona,
          pd_fecha: `${year}-${month}-${day}`,
        };

        const url = "http://localhost:8080/rrhh/post/horarios_por_medico_y_fecha";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        try {
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            const data = await response.json();
            //console.log(data);
            data.forEach((d) => {
              d.fecha = `${year}-${month}-${day}`;
            });
            eventosTotales.push(...convertirDatosParaCalendar(data));
          }
        } catch (error) {
          console.error("Error al obtener los horarios:", error);
        }
        fechaHoy.setDate(fechaHoy.getDate() + 1);
      }
      //console.log(eventosTotales);
      setEvents(eventosTotales);
    };

    obtenerEventos();
  }, []);

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
  // const handleSaveAvailability = () => {
  //   // Llamar a la función de devolución de llamada del componente padre para pasar la disponibilidad seleccionada
  //   if (typeof onAvailabilitySelected === "function") {
  //     onAvailabilitySelected(events);
  //   }
  // };

  return (
    <div style={{ height: "auto" }}>
      <Stack direction="row" spacing={10} justifyContent="center" style={{ margin: "2rem 0" }}>
        <Button variant="contained" color="secondary" onClick={handleIngresarDisponibilidad}>
          Ingresar Disponibilidad
        </Button>
        <Button variant="contained" color="primary" onClick={handleGuardar} disabled={!isCalendarEnabled}>
          Guardar
        </Button>
      </Stack>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: calendarHeight }}
        views={{
          month: true,
          week: true,
        }}
        formats={{
          dayFormat: "dddd", // Configura los días de la semana en español
        }}
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleDoubleClickEvent} // Manejador para doble clic en eventos
        selectable={view === "week" && isCalendarEnabled} // Habilita la selección solo en la vista "Week"
        onView={handleView} // Actualiza el estado de la vista
      />
      {
        events.map((event) => {
          console.log(event.start)
          console.log(event.end)
        })
      }
      {/* <Button variant="contained" onClick={handleSaveAvailability}>
        Guardar Disponibilidad
      </Button> */}
    </div>
  );
}

export default SeleccionarHorarioMedico;
