import React from "react";
import MedicationTable from "../../components/common/tables/MedicationTable";

const LaboratoryPage = (props) => {
  return (
    <div>
      <h1>LaboratoryPage</h1>
      <hr></hr>
      <MedicationTable className="medicationTable"></MedicationTable>
    </div>
  );
};

export default LaboratoryPage;
