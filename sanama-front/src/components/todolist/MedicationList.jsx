import MedicationItem from "./MedicationItem";

const MedicationList = ({
  medications,
  onEditMedication,
  onDeleteMedication,
}) => {
  return (
    <ul>
      {medications.map((medication, index) => (
        <MedicationItem
          key={index}
          index={index}
          medication={medication}
          onEditMedication={onEditMedication}
          onDeleteMedication={onDeleteMedication}
        />
      ))}
    </ul>
  );
};

export default MedicationList;
