// Note: Sidebar Header Component

import Link from "next/link"
import SanamaIcon from "../icons/SanamaIcon"

const SidebarHeader = ({ isOpen }) => {
    return (
        <div className="flex justify-center items-center">
            {isOpen && <Link href="/">
                <div className="flex hover:scale-105 transition duration-300 ease-in-out">
                    <SanamaIcon className="mr-3" />
                    <span className="mr-3 self-center text-3xl font-bold tracking-wider">SANAMA</span>

                </div>
            </Link>}

        </div>

    )
}

export default SidebarHeader