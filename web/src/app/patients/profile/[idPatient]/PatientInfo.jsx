"use client"
const PatientInfo = ({ gender, dni, dateofbirth, patientState, insuranceCode, insuranceType }) => {


    return (
        <section className="block p-6 h-[300px] bg-white border border-gray-200 rounded-2xl shadow">
            <header className="p-5  text-2xl font-bold tracking-wider text-gray-900">
                Informacion personal:
            </header>

            <section className="flex text-large pt-4 text-gray-700">
                <dl className="basis-1/3">
                    <dt className="text-sm px-5">Género</dt>
                    <dd className="text-l font-bold px-5 pb-10">{gender}</dd>

                    <dt className="text-sm px-5 ">DNI</dt>
                    <dd className="text-l font-bold px-5 ">{dni}</dd>
                </dl>

                <dl className="basis-1/3">
                    <dt className="text-sm px-5 ">Código de seguro</dt>
                    <dd className="font-bold px-5 pb-10">{insuranceCode}</dd>

                    <dt className="text-sm px-5 ">Tipo de seguro</dt>
                    <dd className="font-bold px-5 ">{insuranceType}</dd>
                </dl>

                <dl className="basis-1/3">
                    <dt className="text-sm px-5">Estado</dt>
                    <dd className="font-bold px-5 pb-10">{patientState == 1 ? "Activo" : "Inactivo"}</dd>

                    <dt className="text-sm px-5">Fecha de nacimiento</dt>
                    <dd className="font-bold px-5">{dateofbirth}</dd>
                </dl>
            </section>
        </section >
    )
}

export default PatientInfo