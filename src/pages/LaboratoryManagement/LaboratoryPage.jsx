import React from "react";
import MedicationTable from "../../components/medication/MedicationTable";

const LaboratoryPage = (props) => {
  return (
    <div>
      <h1>LaboratoryPage</h1>
      <hr></hr>
      <MedicationTable className="medicationTable"></MedicationTable>
    </div>
  )
};

export default LaboratoryPage;
