"use client"
import PatientInfo from "@/app/patients/profile/[idPatient]/PatientInfo"
import ProfileCard from "@/components/cards/ProfileCard"
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"
import LatestLabResults from "./LatestLabResults"
import PatientActions from "./PatientActions"

const PatientProfile = ({ params }) => {
    const [dataPatient, setDataPatient] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await patientService.buscarPorFiltro(params.idPatient)
                console.log(data[0])
                setDataPatient(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <article className="flex box-content  p-10">
            <div className="w-1/3 flex-row p-10">
                <ProfileCard
                    name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
                    email={dataPatient.correo}
                    phone={dataPatient.telefono}
                    address={dataPatient.direccion}
                />

                <LatestLabResults></LatestLabResults>
            </div>

            <div className="w-2/3 flex-row p-10">
                <PatientInfo
                    gender={dataPatient.sexo}
                    dni={dataPatient.dni}
                    dateofbirth={dataPatient.fechaNacimiento}
                    patientState={dataPatient.estado}
                    insuranceCode={dataPatient.codigoSeguro}
                    insuranceType={dataPatient.tipoSeguro}
                />

                <PatientActions></PatientActions>
            </div>
        </article>
    )
}

export default PatientProfile