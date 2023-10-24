import ActionButton from "@/components/buttons/ActionButton"
import Link from "next/link"

const PatientActions = () => {

    return (
        <section className="mt-10 rounded-2xl h-[300px] grid grid-cols-3 items-center bg-white shadow" >
            <div className="pt-20 h-[300px] flex flex-col items-center text-center group  hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200"></span>
                <p className="text-xl font-medium text-slate-700 mt-3">Citas</p>
            </div>

            <div className="p-20 h-[300px] flex flex-col items-center text-center group  hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200"></span>
                <p className="text-xl font-medium text-slate-700 mt-3">Historial medico</p>
            </div>

            <div className="p-20 h-[300px] flex flex-col items-center text-center group   hover:bg-slate-50 cursor-pointer">
                <span className="p-5 rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-200"></span>
                <p className="text-xl font-medium text-slate-700 mt-3">Analisis de laboratorio</p>
            </div>
        </section>

    )
}

export default PatientActions