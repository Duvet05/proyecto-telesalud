"use client";
import { doctorService } from "@/services/doctorService";
import { useState, useEffect } from "react";
import DoctorActions from "@/components/doctors/DoctorActions";
import LatestAppointmentsDoctor from "@/components/doctors/LastestAppointmentsDoctor";
import ProfileCardDoctor from "@/components/doctors/ProfileCardDoctor";

function formatearFechaNacimiento(fechaNacimiento) {
  if (!fechaNacimiento) {
    return "No especifica";
  }

  const fechaNacimientoObj = new Date(fechaNacimiento);
  const dia = ("0" + fechaNacimientoObj.getDate()).slice(-2); // Agrega un cero inicial si es necesario
  const mes = ("0" + (fechaNacimientoObj.getMonth() + 1)).slice(-2); // Agrega un cero inicial si es necesario
  const año = fechaNacimientoObj.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada;
}
const DoctorProfile = ({ params }) => {
  const [dataDoctor, setDataDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenPerfil, setImagenPerfil] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorData] = await doctorService.buscarPorNombre(
          params.idDoctor
        );
        if (doctorData) {
          console.log("data", doctorData);
          setDataDoctor(doctorData);
          if (doctorData.foto) {
            setImagenPerfil(`data:image/png;base64,${doctorData.foto}`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.idDoctor]);

  if (loading) {
    return "Cargando..."; // Muestra un mensaje de carga mientras los datos se obtienen
  }

  return (
    <article className="flex-column box-content p-10">
      <div className="flex">
        <div className="w-1/2 flex-row p-10">
          <ProfileCardDoctor
            name={`${dataDoctor?.apellidoPaterno ?? ""} ${
              dataDoctor?.apellidoMaterno ?? ""
            }, ${dataDoctor?.nombres ?? ""}`}
            email={dataDoctor?.correoElectronico ?? ""}
            phone={dataDoctor?.telefono ?? ""}
            address={dataDoctor?.direccion ?? "No especifica"}
            module={"doctors"}
            urlEdit={"editDoctorData"}
            id={params.idDoctor}
            imagenPerfil={imagenPerfil}
          />
        </div>

        <div className="w-1/2 flex-row p-10">
          <section className="block p-6 h-[300px] bg-white border border-gray-200 rounded-2xl shadow">
            <header className="p-5 text-2xl font-bold tracking-wider text-gray-900">
              Información personal:
            </header>

            <section className="flex text-large pt-4 text-gray-700">
              <dl className="basis-1/4">
                <dt className="text-sm px-5">Especialidad</dt>
                <dd className="font-bold px-5">
                  {dataDoctor?.especialidad?.nombre ?? "No especifica"}
                </dd>

                <dt className="text-sm px-5">CMP</dt>
                <dd className="font-bold px-5 pb-10">
                  {dataDoctor?.cmp ?? "No especifica"}
                </dd>
              </dl>
              <dl className="basis-1/4">
                <dt className="text-sm px-5">DNI</dt>
                <dd className="text-l font-bold px-5">
                  {dataDoctor?.dni ?? "No especifica"}
                </dd>
                <dt className="text-sm px-5">Género</dt>
                <dd className="text-l font-bold px-5 pb-10">
                  {dataDoctor?.sexo === "F" && "Femenino"}
                  {dataDoctor?.sexo === "M" && "Masculino"}
                  {!dataDoctor?.sexo && "No especifica"}
                </dd>
              </dl>
              <dl className="basis-1/2">
                <dt className="text-sm px-5">Fecha de Nacimiento</dt>
                <dd className="text-l font-bold px-5">
                  {formatearFechaNacimiento(dataDoctor?.fechaNacimiento)}
                </dd>
                <dt className="text-sm px-5">Área</dt>
                <dd className="text-l font-bold px-5 pb-10">
                  {dataDoctor?.area ?? "No especifica"}
                </dd>
              </dl>
            </section>
          </section>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 p-10">
          <DoctorActions id={params.idDoctor} />
        </div>
        <div className="w-1/2 flex-row p-10">
          <LatestAppointmentsDoctor id={params.idDoctor} />
        </div>
      </div>
    </article>
  );
};

export default DoctorProfile;
