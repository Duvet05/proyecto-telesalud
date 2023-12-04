"use client"

const Picker = ({ name1, name2, text, option1, option2, value, setValue }) => {

    const handleOptionChange = (event) => {
        setValue(event.target.value)
    }


    return (
        <div className="flex items-center">
            <h1 className="text-sm text-gray-500">
                {text}
            </h1>

            <div className="grid grid-cols-2">
                <div className="flex items-center px-5">
                    <input
                        id={name1}
                        type="radio"
                        value={option1}
                        name={name1}
                        checked={value === option1}
                        onChange={handleOptionChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label
                        htmlFor={name1}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {option1}
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id={name2}
                        type="radio"
                        value={option2}
                        name={name2}
                        checked={value === option2}
                        onChange={handleOptionChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label
                        htmlFor={name2}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {option2}
                    </label>
                </div>
            </div>

        </div>
    )
}

export default Picker