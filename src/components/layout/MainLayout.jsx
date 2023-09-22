import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer"; 
import "./styles.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "300px" : "0px";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="nav"
        className="main-layout-nav"
        style={{ width: sidebarWidth }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </Box>
      <Box
        component="main"
        className="main-layout-content"
        style={{
          width: `calc(100% - ${sidebarWidth})`,
          backgroundColor: "#F5F5F5",
          flex: 1, // Esto hace que el contenido ocupe todo el espacio disponible antes del footer
        }}
      >
        <Toolbar />
        {/* Aquí puede ir el contenido principal de la página */}
      </Box>
      <Footer /> {/* Añade el componente Footer aquí */}
    </Box>
  );
};

export default MainLayout;
