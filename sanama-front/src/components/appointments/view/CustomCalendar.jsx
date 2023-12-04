import React, { useState } from "react";
import dayjs from "dayjs";

export const CustomCalendar = ({ highlightedDates, onDaySelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDaySelect = (dateString, index) => {
    setSelectedDate(index);
    onDaySelect(dateString);
  };

  return (
    <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-[250px] mt-2 overflow-x-hidden">
      {highlightedDates.map((dateString, index) => {
        const date = dayjs(dateString);
        return (
          <div key={index}>
            <button
              onClick={() => handleDaySelect(dateString, index)}
              className={`px-4 py-2 text-sm w-full border rounded-md transition-all ${
                selectedDate === index
                  ? "bg-orange-500 text-white"
                  : "bg-[#e2e7eb] text-[#4f4f4f]"
              }`}
            >
              {date.format("DD MMM YYYY")}
            </button>
          </div>
        );
      })}
    </div>
  );
};
