const TableCell = ({ data }) => {
    return (
        <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            {data}
        </td>
    )
}

export default TableCell