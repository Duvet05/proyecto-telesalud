import React from "react";
import InputField from "../common/InputField";
import { calcularEdad, formatearFecha } from "@/util/formValidations";

const MainInfoComponent = ({ patientTriageData }) => {
  if (!patientTriageData) {
    return <p>Cargando...</p>;
  }
  const { paciente, triaje } = patientTriageData;
  const edad = calcularEdad(paciente.fechaNacimiento);
  const fechaNacimientoFormateada = formatearFecha(paciente.fechaNacimiento);
  const sexo = paciente.sexo === "M" ? "Masculino" : "Femenino";

  return (
    <div className="col-span-2">
      <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
        Datos del Pacientes
      </h4>

      <div className="ml-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <InputField
          label="Paciente"
          value={`${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`}
          disabled
        />
        <InputField
          label="Fecha de Nacimiento"
          value={fechaNacimientoFormateada}
          disabled
        />
        <InputField label="Edad" value={edad} disabled />
        <InputField label="Sexo" value={sexo} disabled />

        <InputField
          label="Peso (kg)"
          value={triaje ? triaje.peso : "-"}
          disabled
        />
        <InputField
          label="Talla (cm)"
          value={triaje ? triaje.talla : "-"}
          disabled
        />
      </div>
    </div>
  );
};

export default MainInfoComponent;
