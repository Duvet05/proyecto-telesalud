import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SidebarToggleButton from "../common/SidebarToggleButton";
import "./styles.css";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  const appBarStyle = isSidebarOpen
    ? {
        width: "calc(100% - 300px)",
        marginLeft: "300px",
        transition: "margin-left 1s ease, width 1s ease",
      }
    : {
        width: "100%",
        marginLeft: "0px",
        transition: "margin-left 0.5s ease, width 0.5s ease",
      };

  return (
    <AppBar position="fixed" className="topbar-app-bar" style={appBarStyle}>
      <Toolbar>
        <SidebarToggleButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Typography variant="h6">Sanama</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
