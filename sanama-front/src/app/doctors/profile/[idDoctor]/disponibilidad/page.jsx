"use client"
import SeleccionarHorarioMedico from "../SeleccionarHorarioDoctor";
import { useRouter, useParams } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
export default function RegistrarDisponibilidad() {
  const params = useParams();
  const idDoctor = params.idDoctor;
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12" >Disponibilidad</h1>
      <section className="pl-12 pr-14">
        <div className="">
          <div className="flex justify-end mb-7">
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
          <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
            <SeleccionarHorarioMedico doctor={idDoctor} />
          </div>
        </div>
      </section>
    </>
  );

}