import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../common/Sidebar/Sidebar";
import DynamicBreadcrumbs from "../common/DynamicBreadcrumbs";
import "@/styles/globals.css"; // Asegúrate de que este archivo CSS está en la ubicación correcta

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "236px" : "56px";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        component="nav"
        className="main-layout-nav"
        style={{ flexShrink: 0, width: sidebarWidth }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>
      <Box
        component="main"
        className="main-layout-content"
        style={{ backgroundColor: "#F5F5F5", flex: 1 }}
      >
        <DynamicBreadcrumbs /> {/* Aquí están tus breadcrumbs */}
        {children} {/* Aquí se renderizará el contenido de tu página */}
      </Box>
    </Box>
  );
};

export default MainLayout;
