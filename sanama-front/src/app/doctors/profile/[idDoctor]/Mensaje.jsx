import React, { useState } from "react";

function Mensaje({ text }) {
  const [message, setMessage] = useState("");

  const handleMouseEnter = () => {
    setMessage(text);
  };

  const handleMouseLeave = () => {
    setMessage("");
  };

  return (
    <div className="cursor-pointer inline-block relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="mr-2 relative">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative">
          <span className="text-white text-2xl">!</span>
          {message && (
            <div className="bg-blue-500 text-white text-sm px-2 py-1 rounded absolute top-0 left-10 z-50">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mensaje;