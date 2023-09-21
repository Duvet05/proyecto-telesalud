import React, { useState } from 'react';
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import SidebarToggleButton from "../common/SidebarToggleButton";
import './styles.css';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? '300px' : '0px'; 

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        className="main-layout-nav"
        style={{ width: sidebarWidth }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Paso el estado al Sidebar */}
      </Box>
      <Box
        component="main"
        className="main-layout-content"
        style={{ width: `calc(100% - ${sidebarWidth})`, backgroundColor: "#F5F5F5" }} 
      >
        <Toolbar />
        <SidebarToggleButton isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>
    </Box>
  );
};


export default MainLayout;
