import { Fragment } from "react"
import TableCell from "./TableCell"
import TableOptions from "./TableOptions"

const TableRow = ({ row, url }) => {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {row.map((cell, index) => {
                if (index != 0) {
                    if (index === row.length - 1) {
                        return (
                            <Fragment key={index}>
                                <TableCell data={cell.data} />
                                <TableOptions id={parseInt(row[0].data)} url={url} />
                            </Fragment>
                        )
                    } else {
                        return (
                            <TableCell key={index} data={cell.data} />
                        )
                    }
                }
            })}
        </tr>
    )
}


export default TableRow