"use client";
import React, { useState } from "react";
import InformacionDelPaciente from "./PatientInfoAppointment";
import SeleccionarMedico from "./SelectMedic";
import SelectDate from "./SelectDate";
import TriageRequest from "./TriageRequest";
import {
  AppointmentsProvider,
  useAppointments,
} from "@/context/AppointmentsContext";

const PAGES = [
  { component: InformacionDelPaciente, title: "Información del Paciente" },
  { component: SeleccionarMedico, title: "Seleccionar Médico" },
  { component: SelectDate, title: "Reservar Fecha y Hora" },
  { component: TriageRequest, title: "Triaje" },
];

const FormMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const navigateToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const CurrentPageComponent = PAGES[currentPage].component;

  return (
    <AppointmentsProvider>
      <div className="flex">
        <div className="w-4/5">
          <CurrentPageComponent />
        </div>
        <nav className="w-1/5 pt-10 px-6 text-xl text-gray-800 leading-normal">
          <ul className="list-reset py-2 md:py-0">
            {PAGES.map((page, index) => (
              <li
                key={index}
                className={`py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent ${
                  currentPage === index ? "font-bold border-yellow-600" : ""
                }`}
                onClick={() => navigateToPage(index)}
              >
                <span className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600 pb-1 md:pb-0 text-sm">
                  {page.title}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AppointmentsProvider>
  );
};

export default FormMenu;
