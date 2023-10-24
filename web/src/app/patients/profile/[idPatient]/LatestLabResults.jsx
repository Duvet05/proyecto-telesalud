//Pendiente meter datos reales del paciente.
//Los informes de laboratorio son pdfs que se pueden descargar.

import Link from "next/link"

const LatestLabResults = () => {
    return (
        <section className="mt-10 p-10 w-full h-[300px]  bg-white border border-gray-200 rounded-xl shadow">
            <h1 className="font-bold"> Ultimos resultados de laboratorio</h1>

            <button type='button' className="text-blue-700 hover:text-white border 
                        border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                        dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                Subir archivo
            </button>

            <Link href='#' className="text-blue-700 hover:text-white border 
                         hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                        dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                Ver todos
            </Link>
        </section>


    )

}

export default LatestLabResults