
const Dropdown = ({ data, defaultText, text, defaultValue, value, setDropdownValue }) => {
    const handleChange = (e) => {
        setDropdownValue(e.target.value)
    }
    return (
        <select className="block w-1/5 p-4 rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500"
            onChange={handleChange}>
            <option defaultValue value={defaultValue}   >{defaultText}</option>
            {data.map((item, index) => (
                <option key={index} value={item[value]}>{item[text]}</option>
            ))}
        </select>

    )
}

export default Dropdown
