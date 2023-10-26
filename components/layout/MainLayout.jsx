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

  const sidebarWidth = isSidebarOpen ? "255px" : "75px";

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#c8e9ec" }}
    >
      <Box
        component="nav"
        className="main-layout-nav"
        style={{
          flexShrink: 0,
          width: sidebarWidth,
          backgroundColor: "#c8e9ec",
        }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>
      <Box
        component="main"
        className="main-layout-content"
        style={{ backgroundColor: "#c8e9ec", flex: 1 }}
      >
        <DynamicBreadcrumbs /> {/* Aquí están tus breadcrumbs */}
        {children} {/* Aquí se renderizará el contenido de tu página */}
      </Box>
    </Box>
  );
};

export default MainLayout;
