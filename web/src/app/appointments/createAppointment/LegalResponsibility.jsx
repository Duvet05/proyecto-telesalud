"use client";

import DatePicker from "@/components/buttons/DatePicker";
import PickerHider from "@/components/buttons/PickerHider";
import { useState, useEffect } from "react";
import { useAppointments } from "@/context/AppointmentsContext";

const LegalResponsibility = () => {
  const { setAppointmentData } = useAppointments();
  const [isResponsible, setIsResponsible] = useState("Si");

  const [responsibilityData, setResponsibilityData] = useState({
    primerApellido: "",
    segundoApellido: "",
    nombres: "",
    fechaNacimiento: "",
    relationship: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setResponsibilityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAppointmentData((prevData) => ({
      ...prevData,
      responsibilityData: responsibilityData,
    }));
  }, [responsibilityData, setAppointmentData]);

  const handleResponsibilityChange = (option) => {
    setIsResponsible(option);
  };

  return (
    <section id="section2">
      <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">
        Revision de responsabilidad legal
      </h2>
      <PickerHider
        text={"¿El paciente es responsable legal?"}
        option1={"Si"}
        option2={"No"}
        onOptionSelected={handleResponsibilityChange}
        optionSelected={isResponsible}
      />

      {isResponsible === "Si" ? (
        <>
          <div className="grid grid-cols-2 ">
            <div className="relative z-0 w-full pr-6 mb-6 group">
              <input
                type="text"
                name="primerApellido"
                id="primerApellido"
                className="..."
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label htmlFor="primerApellido" className="...">
                Apellido paterno
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="segundoApellido"
                id="segundoApellido"
                className="..."
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label htmlFor="segundoApellido" className="...">
                Apellido materno
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="nombres"
              id="nombres"
              className="..."
              placeholder=" "
              required
              onChange={handleInputChange}
            />
            <label htmlFor="nombres" className="...">
              Nombres
            </label>
          </div>

          <div className="grid grid-cols-2 items-center">
            <DatePicker name={"fechaNacimiento"} onChange={handleInputChange} />
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="relationship"
                id="relationship"
                className="..."
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label htmlFor="relationship" className="...">
                Parentesco
              </label>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default LegalResponsibility;
