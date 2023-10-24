
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

const Table = ({ columns, data, url }) => {
    return (
        <table className="w-full" >
            <TableHeader columns={columns} />
            <TableBody data={data} nColumns={columns.length} url={url} />
        </table>
    )
}

export default Table