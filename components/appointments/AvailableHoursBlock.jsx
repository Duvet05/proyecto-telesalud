import React from "react";

function AvailableHoursBlock({ availableHours, onHourClick }) {
  if (availableHours.length === 0) {
    return <p>No hay horarios disponibles</p>;
  }

  return (
    <div
      className="available-hours-container"
      style={{
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {availableHours.map((hour, index) => (
        <button
          key={index}
          className="hour-block"
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            transition: "background-color 0.3s",
            textAlign: "center",
            width: "100%",
          }}
          onClick={() => onHourClick(hour)}
        >
          {hour}
        </button>
      ))}
    </div>
  );
}

export default AvailableHoursBlock;
