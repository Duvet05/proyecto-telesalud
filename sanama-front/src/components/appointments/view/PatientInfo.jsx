import React from "react";
import InputField from "@/components/common/InputField";

const CAMPOS = [
  { id: "nombres", label: "PACIENTE" },
  { id: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { id: "fecha-atencion", label: "FECHA DE ATENCION" },
  { id: "hora-atencion", label: "HORA DE ATENCION" },
  { id: "medico-responsable", label: "MEDICO RESPONSABLE" },
  { id: "especialidad", label: "ESPECIALIDAD" },
  { id: "nombreAcompanhante", label: "ACOMPAÑANTE" },
  { id: "dniAcompanhante", label: "DNI ACOMPAÑANTE" },
  { id: "estado", label: "ESTADO" },
];

const ESTADOS = [
  "Atendida",
  "En Consultorio",
  "Cancelada",
  "Pendiente",
  "En Triaje",
];

const PatientInfo = ({ pacienteData, appointmentData, doctor }) => {
  if (!pacienteData) return null;

  const { nombres, apellidoPaterno, apellidoMaterno, dni } = pacienteData;
  const { fechaCita, horaCita, codigoCita, estado, dniAcompanhante, nombreAcompanhante } = appointmentData;
  const { nombres: nombresDoc, apellidoPaterno: apellidoPaternoDoc, apellidoMaterno: apellidoMaternoDoc, especialidad } = doctor;

  const values = {
    "nombres": `${nombres} ${apellidoPaterno} ${apellidoMaterno}`,
    "dni": dni,
    "fecha-atencion": fechaCita,
    "hora-atencion": horaCita,
    "medico-responsable": `${nombresDoc} ${apellidoPaternoDoc} ${apellidoMaternoDoc}`,
    "especialidad": especialidad?.nombre || "",
    "nombreAcompanhante": nombreAcompanhante || "No especificado",
    "dniAcompanhante": dniAcompanhante || "No especificado",
    "estado": ESTADOS[estado - 1] || "Desconocido",
  };

  return (
    <>
      <div className="flex items-center space-x-2 w-full">
        <h2 className="text-2xl font-bold mb-4 text-primary-dusk-blue">{codigoCita}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {CAMPOS.map(({ id, label }) => (
          <InputField key={id} label={label} value={values[id]} disabled />
        ))}
      </div>
    </>
  );
};

export default PatientInfo;
