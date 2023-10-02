import React from "react";
import MedicationTable from "../../components/common/tables/MedicationTable";
import SeleccionarHorarioMedico from "./SeleccionarHorarioMedico"
import { useState } from "react";
import moment from "moment"; // Importa moment
const LaboratoryPage = (props) => {
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const handleShowAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  return (
    <div>
      {/* <h1>LaboratoryPage</h1> */}
      <h1>Componente para seleccionar disponibilidad del médico en la semana</h1>
      <hr></hr>
      {/* <MedicationTable className="medicationTable"></MedicationTable> */}
      <SeleccionarHorarioMedico onAvailabilitySelected={handleShowAvailability}></SeleccionarHorarioMedico>
      
      <br /><br /> <br />
      <h2>Disponibilidad Seleccionada:</h2>
      <pre>{JSON.stringify(selectedAvailability, null, 2)}</pre>


    </div>
  );
};

export default LaboratoryPage;
