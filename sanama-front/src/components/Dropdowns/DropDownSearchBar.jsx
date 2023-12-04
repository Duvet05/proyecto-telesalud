"use client"
import { useState } from "react"
import Dropdown from "./Dropdown"
import SearchBar from "../bars/SearchBar"

const DropDownSearchBar = ({ filtro, setFiltro, fetchData, data, defaultText, text, defaultValue, value }) => {
    const [dropdownValue, setDropdownValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData(filtro, dropdownValue)
    }

    const handleChange = (e) => {
        setDropdownValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className=" flex items-center">
            <Dropdown
                data={data}
                defaultText={defaultText}
                text={text}
                defaultValue={defaultValue}
                value={value}
                handleChange={handleChange}
                width={"w-[400px]"}
            />
            <SearchBar
                filtro={filtro}
                setFiltro={setFiltro}
                fetchData={fetchData}
            ></SearchBar>
        </form>
    )
}

export default DropDownSearchBar