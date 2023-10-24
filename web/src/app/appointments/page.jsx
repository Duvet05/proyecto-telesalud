//Listado de citas
"use client";

import SearchAndAddBar from "@/components/bars/SearchAndAddBar";
import { useEffect, useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { appointmentService } from "@/services/appointmentService";
import Link from "next/link";

const AppointmentPage = () => {
  const [appointmentTable, setAppointmentTable] = useState([]);

  return (
    <section className="p-10">
      <h1 className="font-bold text-blue-500 text-6xl pb-8">Citas</h1>
      <SearchAndAddBar linkHref="appointments/createAppointment" />
      <AppointmentTable />
    </section>
  );
};

export default AppointmentPage;
