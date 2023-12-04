"use client"
const SidebarToggleButton = ({ toggleSidebar, children }) => {
    return (
        <div className="flex justify-center items-center fill-white">
            <button onClick={toggleSidebar} className="transition duration-300 ease-in-out hover:scale-105">
                {children}
            </button>
        </div>

    )
}

export default SidebarToggleButton