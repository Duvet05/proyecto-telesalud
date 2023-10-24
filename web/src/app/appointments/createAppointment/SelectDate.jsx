import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import AvailableHoursBlock from "./AvailableHoursBlock";
import { useAppointments } from "@/context/AppointmentsContext";

function ServerDay({ highlightedDays, day, outsideCurrentMonth, ...other }) {
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());
  const badgeClass = isSelected ? "badge-selected" : "";
  return (
    <div className={`badge ${badgeClass}`} key={day.toString()}>
      <div className="pickers-day" {...other}>
        {day.format("D")}
      </div>
    </div>
  );
}

export default function SelectDate() {
  const { appointmentData, setAppointmentData } = useAppointments();
  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    const daysToHighlight = appointmentData.availableDays.map((date) =>
      dayjs(date).date()
    );
    setHighlightedDays(daysToHighlight);
  }, [appointmentData.availableDays]);

  const handleDateChange = useCallback(
    (newDate) => {
      setAppointmentData((prevData) => ({
        ...prevData,
        selectedDate: dayjs(newDate).format("YYYY-MM-DD"),
      }));
    },
    [setAppointmentData]
  );

  const renderDays = () => {
    const daysInMonth = dayjs().daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = dayjs().date(i + 1);
      return (
        <ServerDay
          key={i}
          day={day}
          highlightedDays={highlightedDays}
          onClick={() => handleDateChange(day)}
        />
      );
    });
  };

  return (
    <div className="localization-provider">
      <p className="subtitle">Selecciona una Fecha y hora disponible:</p>
      <div className="calendar-container">
        <div className="date-calendar">
          {renderDays()}
          {appointmentData.selectedDate && appointmentData.selectedHour ? (
            <p>
              Fecha y Hora: {appointmentData.selectedDate}{" "}
              {appointmentData.selectedHour}
            </p>
          ) : (
            <p>No hay fecha ni hora reservada</p>
          )}
        </div>
        <AvailableHoursBlock
          availableHours={appointmentData.availableHours}
          onHourClick={(hour) => {
            setAppointmentData((prevData) => ({
              ...prevData,
              selectedHour: hour,
            }));
          }}
          selectedDate={appointmentData.selectedDate}
        />
      </div>
    </div>
  );
}
