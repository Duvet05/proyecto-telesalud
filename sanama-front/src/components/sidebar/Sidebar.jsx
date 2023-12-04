import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarItem from "@/components/sidebar/SidebarItem";
import SidebarToggleButton from "@/components/sidebar/SidebarToggleButton";

import DoctorIcon from "@/components/icons/DoctorIcon.jsx";
import PatientIcon from "@/components/icons/PatientIcon";
import LabIcon from "@/components/icons/LabIcon.jsx";
import MenuIcon from "@/components/icons/MenuIcon.jsx";
import AppointmentIcon from "@/components/icons/AppointmentIcon.jsx";
import TriageIcon from "@/components/icons/TriageIcon";

import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Pacientes", route: "/patients", Icon: PatientIcon },
  { name: "Medicos", route: "/doctors", Icon: DoctorIcon },
  { name: "Citas", route: "/appointments", Icon: AppointmentIcon },
  { name: "Triajes", route: "/triajes", Icon: TriageIcon },
  { name: "Laboratorio", route: "/laboratories", Icon: LabIcon },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const isActive = (route) => pathname.startsWith(route);

  const baseNavClass =
    "fixed overflow-x-hidden top-0 left-0 h-screen z-10 transition-all duration-300 transform";
  const openNavClass = "translate-x-0 bg-[#28539E] text-white";
  const closedNavClass = "bg-gradient-to-b bg-[#28539E] text-white";

  return (
    <nav
      className={`${baseNavClass} ${
        isSidebarOpen ? openNavClass : closedNavClass
      }`}
      aria-label="Sidebar"
    >
      <div
        className={`pl-1 pr-3 w-full ${
          isSidebarOpen ? "justify-between" : "justify-around"
        } flex`}
      >
        <SidebarHeader className="w-full" isOpen={isSidebarOpen} />
        <SidebarToggleButton toggleSidebar={toggleSidebar}>
          <MenuIcon className="pl-2 pt-2 h-10 w-10" />
        </SidebarToggleButton>
      </div>

      <ul className="w-full font-medium text-[1.275rem]">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.route}
            name={item.name}
            route={item.route}
            isOpen={isSidebarOpen}
            Icon={() => <item.Icon className="h-9 w-9" />}
            isActive={isActive(item.route)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
