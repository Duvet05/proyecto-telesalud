"use client"
import LegalResponsibility from "./LegalResponsibility"
import PatientForm from "./PatientForm"

// Para acceder a los elementos
// elements.namedItem("first_last_name").value

const FormContainer = () => {

    const handleSubmit = async (event) => {
        // //Evitar que el boton me rompa la pagina
        // event.preventDefault()
        // //Recuperar datos del formulario
        // const elements = event.target.elements
        // console.log(elements.namedItem("option1").checked ?? elements.namedItem("option1").value)
        // let nombre = elements.namedItem("option1").value
        // let apellido = elements.namedItem("option1").value
        // let aplleiomaterno = elements.namedItem("option1").value

        // let Nombres = nombre + apellido + aplleiomaterno

        // //llamar al servicio
        // const response = await citasService.citar({
        //     nombreCompleto: Nombres

        // })
    }


    return (
        <form onSubmit={handleSubmit} className="px-10 w-4/5" >
            <hr className="bg-gray-600 mt-12" />
            <PatientForm />
            <hr className="bg-gray-300 mt-12" />
            <LegalResponsibility />
            <button
                type="submit"
                className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Registrar</button>


            {/*
            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 mt-10 text-xl">Seleccionar medico y horarios disponibles</h2>
            <div id='section3' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                <form>
                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-multiselect">
                                Multi Select
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select className="form-multiselect block w-full" multiple id="my-multiselect">
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                            <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div> */}

            {/* <hr className="bg-gray-300 my-12" />

            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">Section 4</h2>

            <div id='section4' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">

                <form>

                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-radio">
                                Radio Buttons
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio text-indigo-600" name="radioOption" value="A" />
                                    <span className="ml-2">Radio A</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input type="radio" className="form-radio" name="radioOption" value="B" />
                                    <span className="ml-2">Radio B</span>
                                </label>
                            </div>
                            <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                        </div>
                    </div>

                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-checkbox">
                                Checkboxes
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox text-indigo-600" checked />
                                    <span className="ml-2">Option 1</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox text-green-500" checked />
                                    <span className="ml-2">Option 2</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox text-pink-600" checked />
                                    <span className="ml-2">Option 3</span>
                                </label>
                            </div>
                            <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <hr className="bg-gray-300 my-12" />

            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">Section 5</h2>
            <div id='section5' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                <blockquote className="border-l-4 border-yellow-600 italic my-4 pl-8 md:pl-12">Final confirmation disclaimer message etc</blockquote>
                <div className="pt-8">
                    <button className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="button">
                        Save
                    </button>
                    <button className="shadow bg-yellow-100 hover:bg-yellow-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4" type="button">
                        Additional Action
                    </button>
                    <button className="shadow bg-yellow-100 hover:bg-yellow-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                        Additional Action
                    </button>
                </div>
            </div> */}
        </form>
    )
}

export default FormContainer