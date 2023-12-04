import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";
import Mensaje from "./Mensaje";
import swal from "sweetalert";

moment.locale("es");
const localizer = momentLocalizer(moment);

function combinarEventosContiguos(eventos) {
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
        eventoActual.end = new Date(
          Math.max(finEventoActual, new Date(evento.end))
        );
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
  const eventos = datos.map((dato) => {
    const fecha = dato.fecha
      ? new Date(dato.fecha.replace(/-/g, "/"))
      : new Date(); // Usamos la fecha actual si fecha es nula
    const horaInicio = new Date(`1970-01-01T${dato.horaInicio}`);
    const horaFin = new Date(`1970-01-01T${dato.horaFin}`);
    const start = new Date(fecha);
    start.setHours(horaInicio.getHours());
    start.setMinutes(horaInicio.getMinutes());
    const end = new Date(fecha);
    end.setHours(horaFin.getHours());
    end.setMinutes(horaFin.getMinutes());
    return {
      id: dato.idTurno,
      title: "Disponible",
      start,
      end,
    };
  });

  return combinarEventosContiguos(eventos);
}

function SeleccionarHorarioMedico({ doctor }) {
  const idDoctor = doctor;
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false);
  const [backData, setBackData] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [calendarHeight, setCalendarHeight] = useState(600);

  const fechaInicioManana = new Date();
  fechaInicioManana.setDate(fechaInicioManana.getDate() + 1); // Establece la fecha para mañana
  fechaInicioManana.setHours(0, 0, 0, 0);

  const fechaHoy = new Date();
  fechaHoy.setDate(1); // Establece el día como el primer día del mes actual
  fechaHoy.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00

  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaLimite.getMonth() + 2, 0); // Establece el mes como el mes siguiente y el día como el último día del mes
  fechaLimite.setHours(23, 59, 59, 999); // Establece el mes como el mes siguiente y el día como el último día del mes
  //Aquí defino que tambien quiero traer data hasta 14 dias despues*********
  const [seHaModificadoHorario, setSeHaModificadoHorario] = useState(false);
  const handleIngresarDisponibilidad = () => {
    setBackData(events);
    setIsCalendarEnabled(true);
    setSeHaModificadoHorario(false);
  };

  const handleCancelarIngresoDisponibilidad = () => {
    if (!seHaModificadoHorario) {
      setIsCalendarEnabled(false);
      return;
    }
    swal({
      title: "¿Cancelar nueva disponibilidad?",
      text: "Se perderán los horarios seleccionados",
      icon: "warning",
      buttons: ["No", "Sí"],
    }).then((respuesta) => {
      if (respuesta) {
        setEvents(backData);
        setIsCalendarEnabled(false);
        setSeHaModificadoHorario(false);
      } else {
        return;
      }
    });
  };

  const handleGuardar = () => {
    if (!seHaModificadoHorario) {
      swal({
        title: "No se encontraron cambios",
        icon: "warning",
        timer: "2500",
      });
      setIsCalendarEnabled(false);
      return;
    }

    swal({
      title: "Confirmar",
      text: "¿Confirmar registro de disponibilidad?",
      icon: "warning",
      buttons: ["No", "Sí"],
      showLoaderOnConfirm: true,
    }).then((respuesta) => {
      if (respuesta) {
        swal({
          title: "Espere...",
          buttons: {
            confirm: null,
            cancel: null,
          },
          closeOnClickOutside: false,
          closeOnEsc: false,
        });

        //FECHAS
        let fechaInicioReg = events[0].start.toISOString().split("T")[0];
        let fechaFinReg = events[0].start.toISOString().split("T")[0];

        const eventosTransformados = events.map((evento) => {
          const horaInicio = evento.start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const horaFin = evento.end.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const fecha = evento.start.toISOString().split("T")[0];

          // Actualiza fechaInicioReg si la fecha actual es anterior
          if (fecha < fechaInicioReg) {
            fechaInicioReg = fecha;
          }

          // Actualiza fechaFinReg si la fecha actual es posterior
          if (fecha > fechaFinReg) {
            fechaFinReg = fecha;
          }

          return {
            horaInicio,
            horaFin,
            fecha,
          };
        });

        function crearJSONParaServidor(
          eventosTransformados,
          idMedico,
          fechaInicioReg,
          fechaFinReg
        ) {
          const jsonParaServidor = {
            pn_id_medico: idMedico,
            pd_fecha_inicio: fechaInicioReg,
            pd_fecha_fin: fechaFinReg,
            arregloHorarios: eventosTransformados.map((evento) => ({
              horaInicio: evento.horaInicio,
              horaFin: evento.horaFin,
              fecha: evento.fecha,
            })),
          };

          return jsonParaServidor;
        }

        const jsonParaServidor = crearJSONParaServidor(
          eventosTransformados,
          idDoctor,
          fechaInicioReg,
          fechaFinReg
        );

        const registrarEvento = async (jsonParaServidor) => {
          try {
            const response = await registrarHorarioMedico(jsonParaServidor);
            setIsCalendarEnabled(false);
            setSeHaModificadoHorario(false);
            swal.close();
            swal({
              text: "El registro se realizó con éxito",
              icon: "success",
            });
          } catch (error) {
            console.error("Error al registrar el horario del médico", error);
            setSeHaModificadoHorario(false);
          }
        };

        // const registrarEvento = async (jsonParaServidor) => {
        //   const url = "http://localhost:8080/rrhh/post/registrarHorarioMedico";
        //   const requestOptions = {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(jsonParaServidor),
        //   };

        //   try {
        //     const response = await fetch(url, requestOptions);
        //     if (response.ok) {
        //       setIsCalendarEnabled(false);
        //       setSeHaModificadoHorario(false);
        //       swal.close();
        //       swal({
        //         text: "El registro se realizó con éxito",
        //         icon: "success",
        //       });
        //     } else {
        //       console.error("Error en la solicitud:", response.statusText);
        //       setSeHaModificadoHorario(false);
        //     }
        //   } catch (error) {
        //     console.error("Error en la solicitud:", error);
        //   }
        // };

        const registrarEventos = async () => {
          await registrarEvento(jsonParaServidor);
        };

        registrarEventos();
      } else {
        setIsCalendarEnabled(false);
        setSeHaModificadoHorario(false);
        console.log("Cancelado");
      }
    });
  };

  useEffect(() => {
    const obtenerEventos = async () => {
      const eventosTotales = [];
      fechaHoy.setDate(fechaHoy.getDate()); //mi limite inferior. Fecha hoy - 7 dias
      const year = fechaHoy.getFullYear();
      const month = fechaHoy.getMonth() + 1;
      const day = fechaHoy.getDate();
      fechaLimite.setDate(fechaLimite.getDate()); //mi limite inferior
      const year2 = fechaLimite.getFullYear();
      const month2 = fechaLimite.getMonth() + 1;
      const day2 = fechaLimite.getDate();
      const requestData = {
        pn_id_medico: idDoctor,
        pd_fecha_inicio: `${year}-${month}-${day}`,
        pd_fecha_fin: `${year2}-${month2}-${day2}`,
      };

      const obtenerEventos = async (requestData) => {
        try {
          const data = await obtenerHorariosPorMedicoEIntervaloFechas(requestData);
          eventosTotales.push(...convertirDatosParaCalendar(data));
        } catch (error) {
          console.error("Error al obtener horarios por médico e intervalo de fechas", error);
        }
        setEvents(eventosTotales); //guardamos eventos
        setIsLoading(false); //permitimos su visualización en front
      };
      setEvents(eventosTotales); //guardamos eventos
      setIsLoading(false); //permitimos su visualizacion en front
    };

    obtenerEventos();
  }, []);

  const isEventOverlapping = (newEvent) => {
    for (const event of events) {
      if (
        (moment(newEvent.start).isSameOrAfter(event.start) &&
          moment(newEvent.start).isBefore(event.end)) ||
        (moment(newEvent.end).isAfter(event.start) &&
          moment(newEvent.end).isSameOrBefore(event.end)) ||
        (moment(newEvent.start).isSameOrBefore(event.start) &&
          moment(newEvent.end).isSameOrAfter(event.end))
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSelectSlot = (slotInfo) => {
    setSeHaModificadoHorario(true);
    console.log(slotInfo);
    if (view === "week") {
      const newEvent = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: "Disponible",
      };

      if (!isEventOverlapping(newEvent)) {
        if (
          slotInfo.start >= fechaInicioManana &&
          slotInfo.start <= fechaLimite
        ) {
          setEvents((prevEvents) => [...prevEvents, newEvent]);
        } else {
          swal({
            title: "Acción no permitida",
            text: "Solo puedes ingresar tu disponibilidad desde el día de mañana y hasta máximo el siguiente mes.",
            icon: "warning",
            timer: "5000",
          });
          //alert("");
        }
      } else {
        swal({
          title: "Acción no permitida",
          text: "El nuevo turno se superpone con un turno existente. Por favor, seleccione otra hora.",
          icon: "warning",
          timer: "3000",
        });
      }
    }
  };
  const handleView = (newView) => {
    setView(newView);
    if (newView === "week") {
      setCalendarHeight(1200);
    } else if (newView === "month") {
      setCalendarHeight(600);
    }
  };
  const handleDoubleClickEvent = (event) => {
    setSeHaModificadoHorario(true);
    if (view === "month") {
      // const shouldDelete = window.confirm("¿Desea eliminar este evento?");
      // if (shouldDelete) {
      //   const updatedEvents = events.filter((e) => e !== event);
      //   setEvents(updatedEvents);
      // }
    } else {
      if (event.start >= fechaInicioManana && event.start <= fechaLimite) {
        const updatedEvents = events.filter((e) => e !== event);
        setEvents(updatedEvents);
      } else {
        swal({
          title: "Acción no permitida",
          text: "Puedes eliminar/modificar tu disponibilidad desde el día de mañana y hasta máximo el siguiente mes.",
          icon: "warning",
          timer: "3000",
        });
      }
    }
  };

  const messages = {
    week: "Semana", // Cambia el nombre de la vista de semana
    month: "Mes",
    today: "Hoy",
    previous: "Anterior",
    next: "Siguiente",
  };

  const dayPropGetter = (date) => {
    const today = moment().startOf('day');
    const isPastDay = moment(date).isBefore(today, 'day') || moment(date).isSame(today, 'day');

    // Personaliza los estilos según tus necesidades para los días pasados
    const style = {
      backgroundColor: isPastDay ? '#EAF6FF' : 'white',
      // color: isPastDay ? 'gray' : 'black',
      // Otros estilos...
    };

    return {
      style,
    };
  };
  const minTime = new Date();
  minTime.setHours(6, 0, 0); // Establece la hora mínima a las 6:00 AM

  const maxTime = new Date();
  maxTime.setHours(22, 0, 0); // Establece la hora máxima a las 10:00 PM
  return (
    <>
      {/* <header className="p-5  text-2xl font-bold tracking-wider text-gray-900">
        Disponibilidad:
      </header> */}
      <div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div style={{ height: "auto" }}>
            <div
              className="flex justify-center space-x-4"
              style={{ margin: "2rem 0" }}
            >
              <button
                className={`${!isCalendarEnabled
                    ? "text-white bg-purple-800 border border-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                    : "text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                  }`}
                onClick={handleIngresarDisponibilidad}
                disabled={isCalendarEnabled}
              >
                Ingresar Disponibilidad
              </button>
              <button
                className={`${isCalendarEnabled
                    ? "text-white bg-red-800 border border-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                    : "text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                  }`}
                onClick={handleCancelarIngresoDisponibilidad}
                disabled={!isCalendarEnabled}
              >
                Cancelar
              </button>
              <button
                className={`${isCalendarEnabled
                    ? "text-white bg-blue-800 border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                    : "text-gray-400 bg-gray-100 border border-black-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 "
                  }`}
                onClick={handleGuardar}
                disabled={!isCalendarEnabled}
              >
                Guardar
              </button>
              <Mensaje
                text={
                  "Podrá visualizar y registrar su disponibilidad en los meses actual y siguiente"
                }
              ></Mensaje>
            </div>
            <Calendar
              messages={messages}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              dayPropGetter={dayPropGetter}
              style={{ height: calendarHeight }}
              views={{
                month: true,
                week: true,
              }}
              formats={{
                dayFormat: "dddd D",
              }}
              onSelectSlot={handleSelectSlot}
              onDoubleClickEvent={isCalendarEnabled && handleDoubleClickEvent}
              selectable={view === "week" && isCalendarEnabled}
              onView={handleView}
              min={minTime}
              max={maxTime}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SeleccionarHorarioMedico;
