import React from "react";

const CustomizedDialog = ({ onClose, open }) => {
  if (!open) return null; // No renderizar el diálogo si no está abierto

  return (
    <div>
      <button onClick={onClose} className="border px-4 py-2">
        Abrir pop-up
      </button>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-xl max-w-xl w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Confirmar Cita</h2>
            <button onClick={onClose} className="text-lg font-bold">
              X
            </button>
          </div>
          <div className="mt-4">¿Desea reservar esta cita médica?</div>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="border px-4 py-2">
              Cancelar
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedDialog;
