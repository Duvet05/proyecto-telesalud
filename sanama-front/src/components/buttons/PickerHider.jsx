const PickerHider = ({ text, option1, option2, onOptionSelected, optionSelected }) => {
    const handleChange = (event) => {
        onOptionSelected(event.target.value)
    }
    return (
        <div className="flex items-center pb-10">
            <h1 className="text-sm text-gray-500 pr-10">{text}</h1>
            <div className="grid grid-cols-2">
                <div className="relative">
                    <input id={option1}
                        type="radio"
                        value={option1}
                        name="dual-picker-1"
                        className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2"
                        checked={optionSelected === option1}
                        onChange={handleChange}
                    />
                    <label htmlFor={option1}
                        className="ml-2 text-sm font-medium text-gray-900 ">
                        {option1}
                    </label>
                </div>
                <div className="relative ">
                    <input id={option2}
                        type="radio"
                        value={option2}
                        name="dual-picker-2"
                        className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2"
                        checked={optionSelected === option2}
                        onChange={handleChange}
                    />
                    <label htmlFor={option2}
                        className="ml-2 text-sm font-medium text-gray-900">
                        {option2}
                    </label>
                </div>
            </div>
        </div>


    )
}

export default PickerHider