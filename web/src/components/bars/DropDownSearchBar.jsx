"use client"
import { useState } from "react"
import Dropdown from "./Dropdown"

const DropDownSearchBar = ({ filtro, setFiltro, fetchData, data, defaultText, text, defaultValue, value }) => {
    const [dropdownValue, setDropdownValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData(filtro, dropdownValue)
    }

    return (
        <form onSubmit={handleSubmit} className="pb-10 flex items-center">
            <Dropdown
                data={data}
                defaultText={defaultText}
                text={text}
                defaultValue={defaultValue}
                value={value}
                setDropdownValue={setDropdownValue}
            />
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border 
                border-gray-300 rounded-r-  lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                />

                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Buscar</button>
            </div>
        </form>
    )
}

export default DropDownSearchBar