import { useState, useMemo } from "react"

export const useSort = (data) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" })
  const sortedData = useMemo(() => {
    const sortArray = [...data]

    if (sortConfig.key) {
      sortArray.sort((a, b) => {
        let keyA = a[sortConfig.key]
        let keyB = b[sortConfig.key]

        // Lowercase string values for case-insensitive comparison

        if (typeof keyA === "string") keyA = keyA.toLowerCase()
        if (typeof keyB === "string") keyB = keyB.toLowerCase()

        // Handle date and time sorting
        if (sortConfig.key === "date") {
          keyA = new Date(`${a.date} ${a.time}`)
          keyB = new Date(`${b.date} ${b.time}`)
        }

        // Handle status sorting
        if (sortConfig.key === "status") {
          const statusOrder = {
            Atendida: 1,
            "En Consultorio": 2,
            Cancelada: 3,
            Pendiente: 4,
            Desconocido: 5,
          }
          keyA = statusOrder[keyA]
          keyB = statusOrder[keyB]
        }

        if (sortConfig.key === "ID") {
          keyA = parseInt(keyA)
          keyB = parseInt(keyB)
        }

        // Comparison logic
        return (
          (keyA < keyB ? -1 : 1) *
          (sortConfig.direction === "ascending" ? 1 : -1)
        )
      })
    }
    return sortArray
  }, [data, sortConfig])

  const requestSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }))
  }

  return { sortedData, requestSort, sortConfig }
}
