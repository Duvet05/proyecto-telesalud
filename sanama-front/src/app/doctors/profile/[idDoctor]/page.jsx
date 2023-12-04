"use client"
import ProfileCard from "@/components/cards/ProfileCard"
import { doctorService } from "@/services/doctorService"
import { useState, useEffect } from "react"
import DoctorActions from "./DoctorActions"
import LatestAppointmentsDoctor from "./LastestAppointmentsDoctor"
import { MdArrowBack } from 'react-icons/md'
import ProfileCardDoctor from "./ProfileCardDoctor"
import { useRouter } from "next/navigation"
function formatearFechaNacimiento(fechaNacimiento) {
  if (!fechaNacimiento) {
    return "No especifica"
  }

  const fechaNacimientoObj = new Date(fechaNacimiento)
  const dia = ("0" + fechaNacimientoObj.getDate()).slice(-2) // Agrega un cero inicial si es necesario
  const mes = ("0" + (fechaNacimientoObj.getMonth() + 1)).slice(-2) // Agrega un cero inicial si es necesario
  const año = fechaNacimientoObj.getFullYear()

  const fechaFormateada = `${dia}/${mes}/${año}`
  return fechaFormateada
}
const DoctorProfile = ({ params }) => {
  const [dataDoctor, setDataDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await doctorService.buscarPorNombre(params.idDoctor)
        if (data && data.length > 0) {
          console.log("data", data[0])
          setDataDoctor(data[0])
          if (data[0].foto) {
            setImagenPerfil(`data:image/png;base64,${data[0].foto}`)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false) // Marca la carga como completa
      }
    }
    fetchData()
  }, [params.idDoctor]) // Asegúrate de depender de 'params.idDoctor'

  if (loading) {
    return "" // Muestra un mensaje de carga mientras los datos se obtienen
  }

  return (
    <article className="flex-column box-content p-10">
      <div className="flex justify-end">
        <div className="flex-end pr-10 pf-10">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
          onClick={() => router.push("/doctors/")}
        >
          <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
          Volver
        </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 flex-row p-10">
          <ProfileCardDoctor
            name={`${dataDoctor?.apellidoPaterno ?? ""} ${dataDoctor?.apellidoMaterno ?? ""
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
                  {dataDoctor?.sexo === "F"
                    ? "Femenino"
                    : dataDoctor?.sexo === "M"
                      ? "Masculino"
                      : "No especifica"}
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
  )
}

export default DoctorProfile
