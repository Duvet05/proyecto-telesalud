import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { toDate } from "./dateUtils";
import { appointmentService } from "@/services/appointmentService";

function categorizeSlots(slots) {
  const categories = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  slots.forEach((slot) => {
    const date = toDate(slot.date);
    const hour = parseInt(format(date, "H"), 10);

    if (hour < 12) categories.morning.push(slot);
    else if (hour < 17) categories.afternoon.push(slot);
    else categories.evening.push(slot);
  });

  return categories;
}

function Slot({ slot, setSelectedSlot, selectedSlot }) {
  return (
    <div
      onClick={() => setSelectedSlot(slot)}
      className={`available-slot ${selectedSlot === slot ? "active-slot" : ""}`}
    >
      {format(toDate(slot.date), "h:mm a")}
    </div>
  );
}

function SlotSection({ slots, label, setSelectedSlot, selectedSlot }) {
  if (!slots.length) return null;
  return (
    <div className="day-area">
      <span className="day-area-header">{label}</span>
      <div className="available-slots-for-day">
        {slots.map((slot, index) => (
          <Slot
            key={index}
            slot={slot}
            setSelectedSlot={setSelectedSlot}
            selectedSlot={selectedSlot}
          />
        ))}
      </div>
    </div>
  );
}

function AvailableSlots({
  selectedDay,
  selectedAppointmentType,
  providerId,
  providerIds,
  appointmentLocationId,
  appointmentContactType,
  setSelectedSlot,
  selectedSlot,
  moveToNextStep,
}) {
  const [data, setData] = useState([]);
  const slotsCategories = categorizeSlots(data.slots_available || []);
  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";

  useEffect(() => {
    const params = {
      org_level: false,
      timezone,
      appointment_type_id: selectedAppointmentType.id,
      provider_id: providerId,
      provider_ids: providerIds,
      end_date: selectedDay.toString(),
      start_date: selectedDay.toString(),
      appointment_location_id: appointmentLocationId,
      contact_type: appointmentContactType,
    };

    appointmentService
      .getAvailableSlots(params)
      .then(setData)
      .catch((error) =>
        console.error("Error fetching available slots:", error)
      );
  }, [selectedDay]);

  const noSlotsAvailable = Object.values(slotsCategories).every(
    (cat) => cat.length === 0
  );

  return (
    <div className="embeddable-availability-container">
      {/* ... header elements ... */}

      <SlotSection
        slots={slotsCategories.morning}
        label="Morning"
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
      />
      <SlotSection
        slots={slotsCategories.afternoon}
        label="Afternoon"
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
      />
      <SlotSection
        slots={slotsCategories.evening}
        label="Evening"
        setSelectedSlot={setSelectedSlot}
        selectedSlot={selectedSlot}
      />

      {noSlotsAvailable && (
        <div className="embeddable-empty-state">
          <p className="embeddable-empty-state__title">
            No available time slots
          </p>
          {/* ... other elements ... */}
        </div>
      )}

      <div className="available-slot-action">
        <button
          className="sw-button primary-button large-button slot-confirm-button"
          disabled={!selectedSlot}
          onClick={moveToNextStep}
        >
          Confirm Date and Time
        </button>
      </div>
    </div>
  );
}

export default AvailableSlots;
