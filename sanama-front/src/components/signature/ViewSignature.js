import React from "react";
import { FaTimes } from "react-icons/fa";

export default function ViewSignature({ url, onCancel }) {
  return (
    <div className="relative my-4 p-2 border-2 border-dashed border-gray-300">
      <div className="flex justify-end space-x-2 mb-2">
        <button
          onClick={onCancel}
          className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none"
          aria-label="Cancelar firma"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
      <img
        src={url}
        alt="Firma"
        className="block mx-auto"
        style={{ maxWidth: "100%", maxHeight: "150px" }} // Se ajusta a la dimensión máxima disponible
        draggable={false}
      />
    </div>
  );
}
