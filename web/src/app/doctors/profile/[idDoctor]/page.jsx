"use client"
import ProfileCard from "@/components/cards/ProfileCard"
import { doctorService } from "@/services/doctorService"
import { useEffect, useState } from "react"

const DoctorProfile = ({ params }) => {
    const [dataDoctor, setDataDoctor] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await doctorService.buscarPorMedicoEspecialidad(params.idDoctor)
                console.log(data[0])
                setDataDoctor(data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    return (
        <article className="flex box-content p-10">
            <div className="w-1/3 flex-row p-10">
                <ProfileCard
                    name={`${dataDoctor?.nombres ?? ''} ${dataDoctor?.apellidoPaterno ?? ''} ${dataDoctor?.apellidoMaterno ?? ''}`}
                    email={dataDoctor?.correo ?? ''}
                    phone={dataDoctor?.telefono ?? ''}
                    address={dataDoctor?.direccion ?? ''}
                />
            </div>
            <div className="w-2/3 flex-row p-10">

            </div>
        </article>

    )
}

export default DoctorProfile