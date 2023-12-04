"use client"
import { startOfWeek, addDays, format, subWeeks, addWeeks, isBefore, endOfWeek, getMonth, isSameDay, isAfter, startOfDay, isEqual } from 'date-fns'
import es from 'date-fns/locale/es'
import { useEffect, useState } from 'react'

const Calendar = ({ selectedDate, handleDateClick, disabled }) => {
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
    const [currentWeek, setCurrentWeek] = useState(startOfThisWeek)
    const [weekDates, setWeekDates] = useState([])


    useEffect(() => {
        const dates = Array.from({ length: 7 }).map((_, index) => addDays(currentWeek, index))
        setWeekDates(dates)
    }, [currentWeek])


    const goToPreviousWeek = () => {
        const previousWeek = subWeeks(currentWeek, 1)
        if (isEqual(previousWeek, startOfThisWeek)) {
            setCurrentWeek(previousWeek)
            const dates = Array.from({ length: 7 }).map((_, index) => addDays(previousWeek, index))
            setWeekDates(dates)
        }
    }

    const goToNextWeek = () => {
        const nextWeek = addWeeks(currentWeek, 1)
        if (isBefore(nextWeek, addDays(startOfThisWeek, 13))) {
            setCurrentWeek(nextWeek)
            const dates = Array.from({ length: 7 }).map((_, index) => addDays(nextWeek, index))
            setWeekDates(dates)
        }
    }

    const formatMonthRange = () => {
        if (weekDates.length > 0) {
            const firstDateMonth = getMonth(weekDates[0]) + 1
            const lastDateMonth = getMonth(weekDates[6]) + 1
            const year = weekDates[0].getFullYear()

            if (firstDateMonth === lastDateMonth) {
                return `${format(weekDates[0], 'MMMM', { locale: es })} ${year}`
            } else {
                return `${format(weekDates[0], 'MMMM', { locale: es })} - ${format(weekDates[6], 'MMMM', { locale: es })} ${year}`
            }
        } else {
            return ''
        }
    }

    const isPastDate = (date) => {
        return isBefore(date, startOfDay(new Date()))
    }

    const isValidDate = (date) => {
        return !isAfter(new Date(), date) || isEqual(new Date().getDate(), date.getDate())
    }


    return (
        <div className="flex flex-col w-[500px] h-[170px] items-center bg-white rounded-lg border border-gray-300">
            <div className='flex items-center space-x-4 py-4'>
                <button
                    className=" hover:bg-gray-300 p-2 rounded"
                    type='button'
                    onClick={goToPreviousWeek}
                    disabled={isSameDay(currentWeek, startOfThisWeek)}
                >
                    &lt;
                </button>
                <div className="text-xl font-bold">{formatMonthRange()}</div>
                <button
                    className=" hover:bg-gray-300 p-2 rounded"
                    type='button'
                    onClick={goToNextWeek}
                    disabled={isSameDay(currentWeek, addWeeks(startOfThisWeek, 1))}
                >
                    &gt;</button>
            </div>
            <div className="flex">
                {weekDates.map((date) => (
                    <div
                        key={date}
                        className={`flex rounded-lg mx-1 my-1 transition-all duration-300 justify-center w-16  
                        ${isPastDate(date) ? 'text-slate-400' : 'group hover:bg-orange-200 hover:shadow-lg hover-light-shadow cursor-pointer'}}
                        ${date.getTime() === selectedDate?.getTime() ? 'bg-orange-100' : ''}`}
                        onClick={isValidDate(date) && !disabled ? handleDateClick(date) : () => { }}

                    >
                        <div className="flex p-4">
                            <div className="text-center">
                                <p className={`text-gray-900 ${isEqual(date, selectedDate) ? 'text-orange-400' : (isPastDate(date) ? 'text-slate-400' : 'group-hover:text-orange-400')} text-sm transition-all duration-300`}>
                                    {format(date, 'EEE', { locale: es })}
                                </p>
                                <p className={`text-gray-900 ${isEqual(date, selectedDate) ? 'text-orange-400 font-bold' : (isPastDate(date) ? 'text-slate-400' : 'group-hover:text-orange-400 group-hover:font-bold')} mt-3 transition-all duration-300`}>
                                    {format(date, 'd', { locale: es })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Calendar


