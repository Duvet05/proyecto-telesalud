import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const MedicationItem = ({
  index,
  medication,
  onEditMedication,
  onDeleteMedication,
}) => {
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(medication.nombre);
  const [indicacion, setIndicacion] = useState(medication.indicacion);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setNombre(medication.nombre);
    setIndicacion(medication.indicacion);
  };
  const handleDone = () => {
    if (nombre.trim() && indicacion.trim()) {
      onEditMedication(index, {
        nombre: nombre.trim(),
        indicacion: indicacion.trim(),
      });
      setEditing(false);
    }
  };
  const handleDelete = () => onDeleteMedication(index);
  const handleChangeNombre = (e) => setNombre(e.target.value);
  const handleChangeIndicacion = (e) => setIndicacion(e.target.value);

  return (
    <li className="mb-1 border-gray-300 w-full">
      <div className="mb-4 w-full flex space-x-2 items-center rounded-lg">
        <input
          type="text"
          value={nombre}
          onChange={handleChangeNombre}
          readOnly={!editing}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ingresa medicamento..."
        />
        <input
          type="text"
          value={indicacion}
          onChange={handleChangeIndicacion}
          readOnly={!editing}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ingresa Indicaciones..."
        />
        <div className="w-[130px] flex space-x-3">
          {editing ? (
            <>
              <button type="button" onClick={handleDone}>
                <MdOutlineDone
                  size={20}
                  className="hover:text-green-400 text-gray-500"
                />
              </button>
              <button type="button" onClick={handleCancel}>
                <RxCross2
                  size={20}
                  className="text-gray-500 hover:text-orange-400"
                />
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleEdit}>
                <CiEdit
                  size={20}
                  className="text-gray-500 hover:text-yellow-500"
                />
              </button>
              <button type="button" onClick={handleDelete}>
                <AiOutlineDelete
                  size={18}
                  className="text-gray-500 hover:text-red-500"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default MedicationItem;
