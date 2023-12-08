"use client";
import SeleccionarHorarioMedico from "@/components/doctors/SeleccionarHorarioDoctor";
import { useParams } from "next/navigation";

export default function RegistrarDisponibilidad() {
  const params = useParams();
  const idDoctor = params.idDoctor;
  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Disponibilidad</h1>
      <section className="pl-12 pr-14">
        <div className="">
          <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
            <SeleccionarHorarioMedico doctor={idDoctor} />
          </div>
        </div>
      </section>
    </>
  );
}
