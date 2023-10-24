import React from "react";

function CompanionQuestion({ value = "yes", onChange }) {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">
        ¿El paciente es responsable legal?
      </p>
      <div className="flex">
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="companionQuestion"
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
          />
          <span className="ml-2">Sí</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="companionQuestion"
            value="no"
            checked={value === "no"}
            onChange={onChange}
          />
          <span className="ml-2">No</span>
        </label>
      </div>
    </div>
  );
}

export default CompanionQuestion;
