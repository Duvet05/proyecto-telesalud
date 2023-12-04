import React, { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

const defaultOptions = {
  autoHide: false,
  todayBtn: true,
  todayBtnText: "Hoy",
  clearBtn: false,
  datepickerClassNames: "top-17",
  defaultDate: null,
  language: "es",
  disabledDates: [],
  theme: {
    input: "h-[45px] text-end",
    disabled: "text-gray-900 text-gray-600",
  },
  weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  inputPlaceholderProp: "Selecciona una fecha",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
}

const DateRangePicker = ({ dateInitial, setDateInitial, setDateFinal }) => {
  const [showInitial, setShowInitial] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const handleChangeInitial = (selectedDate) => {
    const dateObject = new Date(selectedDate)
    setDateInitial(dateObject)
  }

  const handleChangeFinal = (selectedDate) => {
    setDateFinal(new Date(selectedDate))
  }

  const optionsInitial = {
    ...defaultOptions,
    inputPlaceholderProp: "Fecha Inicial",
    inputNameProp: "fecha_inicial",
    inputIdProp: "fecha_inicial",
  }

  const optionsFinal = {
    ...defaultOptions,
    minDate: dateInitial,
    inputPlaceholderProp: "Fecha Final",
    inputNameProp: "fecha_final",
    inputIdProp: "fecha_final",
  }

  return (
    <section className="flex items-center h-[45px] w-full max-w-[400px]">
      <Datepicker
        classNames="pr-2 min-w-7xl w-full"
        onChange={handleChangeInitial}
        options={optionsInitial}
        show={showInitial}
        setShow={setShowInitial}
      ></Datepicker>
      <Datepicker
        classNames="pr-2 min-w-7xl w-full"
        onChange={handleChangeFinal}
        options={optionsFinal}
        show={showFinal}
        setShow={setShowFinal}
      />
    </section>
  )
}

export default DateRangePicker
