"use client"
import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

const defaultOptions = {
    autoHide: false,
    clearBtn: false,
    todayBtn: false,
    todayBtnText: "Hoy",
    minDate: new Date("1950-01-01"),
    maxDate: new Date(),
    datepickerClassNames: "top-17 h-2",
    defaultDate: null,
    language: "es",
    disabledDates: [],
    theme: {
        input: " h-[45px] pl-10 text-start",
        disabledText: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputPlaceholderProp: "Selecciona una fecha",
    inputDateFormatProp: {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    },
}

const DatePicker = ({ name, selectedDate, setSelectedDate, disabled }) => {
    const [showDate, setShowDate] = useState(false)

    const options = {
        ...defaultOptions,
        inputPlaceholderProp: "Fecha",
        inputNameProp: { name },
        inputIdProp: { name },
    }

    return (
        <Datepicker
            classNames="pr-2 w-fit h-fit"
            onChange={setSelectedDate}
            options={defaultOptions}
            value={selectedDate}
            show={showDate}
            setShow={setShowDate}
            disabled={disabled}
        />
    )
}

export default DatePicker