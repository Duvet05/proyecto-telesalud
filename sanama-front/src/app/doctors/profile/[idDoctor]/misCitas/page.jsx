"use client";
import { useEffect, useState } from "react";
import CitasMedico from "@/components/doctors/CitasMedico";
import { useParams } from "next/navigation";
import { doctorService } from "@/services/doctorService";

export default function MisCitasDoctor() {
  const params = useParams();
  const idDoctor = params.idDoctor;
  const [doctor, setDoctor] = useState(null);

  const fetchData = async (filtro) => {
    try {
      const response = await doctorService.buscarPorNombre(filtro);
      if (!response) {
        throw new Error("Error al obtener datos del médico");
      }
      setDoctor(response);
    } catch (error) {
      console.error("Error al obtener datos del médico:", error);
    }
  };

  useEffect(() => {
    if (idDoctor) {
      fetchData(idDoctor);
    }
  }, [idDoctor]);

  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Mis citas</h1>
      <section className="pl-12 pr-14">
        <div className="p-10 ">
          <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
            {doctor ? (
              <CitasMedico dataDoctor={doctor} />
            ) : (
              <p>Cargando datos del médico...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
