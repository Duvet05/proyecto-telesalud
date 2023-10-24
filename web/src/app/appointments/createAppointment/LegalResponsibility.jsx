"use client"

import DatePicker from "@/components/buttons/DatePicker"
import PickerHider from "@/components/buttons/PickerHider"
import { useState } from "react"

const LegalResponsibility = () => {
    const [isResponsible, setIsResponsible] = useState("Si")

    const handleResponsibilityChange = (option) => {
        setIsResponsible(option)
    }

    return (

        <section id="section2">
            <h2 className="w-full font-bold break-normal text-gray-700  pb-8 text-2xl">Revision de responsabilidad legal</h2>
            <PickerHider
                text={"¿El paciente es responsable legal?"}
                option1={"Si"} option2={"No"}
                onOptionSelected={handleResponsibilityChange}
                optionSelected={isResponsible} />

            {isResponsible === "Si" ? <>
                <div className="grid grid-cols-2 ">
                    <div className="relative z-0 w-full pr-6 mb-6 group">
                        <input
                            type="text"
                            name="r_first_name"
                            id="r_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label
                            htmlFor="r_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido paterno
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="floating_last_name"
                            id="floating_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido materno
                        </label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Nombres
                    </label>
                </div>

                <div className="grid grid-cols-2 items-center">
                    <DatePicker name={"fecha-nacimiento-responsable"} />
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Parentesco
                        </label>
                    </div>
                </div>
            </> : null}


        </section>
    )
}

export default LegalResponsibility