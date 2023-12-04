"use client"
import { useEffect, useState } from 'react';
import CitasMedico from '../CitasMedico';
import { useRouter, useParams } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
export default function MisCitasDoctor() {
  const router = useRouter();
  const params = useParams();
  const idDoctor = params.idDoctor;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/rrhh/post/buscarMedico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pv_filtro: idDoctor,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos del médico');
        }

        const data = await response.json();
        setDoctor(data); // asume que la respuesta de la API es el objeto del médico
      } catch (error) {
        console.error('Error al obtener datos del médico:', error);
      }
    };

    fetchData();
  }, [idDoctor]); // se ejecutará cuando idDoctor cambie

  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Mis citas</h1>

      <section className="pl-12 pr-14">
        <div className="flex justify-end pr-10">
          <div className="flex-end">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
              onClick={() => router.back()}
            >
              <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
              Volver
            </button>
          </div>
        </div>
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
