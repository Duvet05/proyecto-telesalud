import TableRow from "./TableRow"

const TableBody = ({ data, url }) => {
  return (
    <tbody className="border-2 border-gray-200">
      {data.map((row, index) => {
        return (
          <TableRow key={index} row={row} url={url} />
        )
      })}
    </tbody>
  )
}

export default TableBody
