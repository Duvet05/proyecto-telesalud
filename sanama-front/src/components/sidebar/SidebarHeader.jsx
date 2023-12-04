import Link from "next/link";
import SanamaIcon from "../icons/SanamaIcon";

const SidebarHeader = ({ isOpen }) => {
  return (
    <div className="flex justify-center items-center">
      {isOpen && (
        <Link href="/">
          <div className="flex hover:scale-105 transition duration-300 ease-in-out">
            <SanamaIcon className="mr-4" />
            <span className="self-center text-4xl font-bold tracking-wider text-white" style={{ color: '#FFF0FF' }}>
              Sanama
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarHeader;
