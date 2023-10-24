"use client"
const DatePicker = ({ name }) => {
    const minDate = "1920-01-01"
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value)
        if (selectedDate > today) {
            event.target.value = formattedDate
        }
    }
    return (
        <div className="w-1/2">
            <h1 className="text-sm text-gray-500">Fecha de nacimiento</h1>
            <input
                name={name}
                type="date"
                className=" mt-3 bg-slate-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                placeholder="Fecha de nacimiento"
                max={formattedDate}
                min={minDate}
                onChange={handleDateChange} />
        </div>
    )
}

export default DatePicker