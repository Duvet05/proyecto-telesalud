import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../common/Sidebar";
import DynamicBreadcrumbs from "../common/DynamicBreadcrumbs"; // Asegúrate de importar esto
import "./styles.css";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "300px" : "60px";

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
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default MainLayout;
