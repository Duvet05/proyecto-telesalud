const FormMenu = () => {
    return (
        <nav className="w-1/5 pt-10 px-6 text-xl text-gray-800 leading-normal">
            <div className="block lg:hidden sticky inset-0">
                <button id="menu-toggle" className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-yellow-600 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
            </div>
            <div className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" id="menu-content">
                <ul className="list-reset py-2 md:py-0">
                    <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-yellow-600">
                        <a href='#section1' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                            <span className="pb-1 md:pb-0 text-sm">Informacion del paciente</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href='#section2' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                            <span className="pb-1 md:pb-0 text-sm">Responsabilidad legal</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href='#section3' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                            <span className="pb-1 md:pb-0 text-sm">Medico</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href='#section4' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                            <span className="pb-1 md:pb-0 text-sm">Horarios disponibles</span>
                        </a>
                    </li>

                    <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href='#section5' className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600">
                            <span className="pb-1 md:pb-0 text-sm">Triaje</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default FormMenu