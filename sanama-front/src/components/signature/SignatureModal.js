import React, { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { Modal } from "flowbite-react";

export function SignatureModal({ show, onConfirm, onClose }) {
  const sigRef = useRef(null);

  const handleConfirm = () => {
    const sigURL = sigRef.current.toDataURL();
    onConfirm(sigURL); // Llama directamente a onConfirm sin esperar una promesa
    onClose(); // Cierra el modal
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="bg-gray-200 text-black p-2 flex justify-between items-center">
        Firma del Doctor
      </Modal.Header>
      <div className="p-4 bg-white">
        <div className="text-sm font-medium text-gray-900">
          Dibuja tu firma abajo:
        </div>
        <div className="inline-block border border-blue-700">
          <ReactSignatureCanvas
            velocityFilterWeight={1}
            ref={sigRef}
            canvasProps={{
              width: "600",
              height: "200",
              className: "sigCanvas",
            }}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
