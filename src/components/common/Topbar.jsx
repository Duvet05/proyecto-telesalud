import React from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import './styles.css';

const Topbar = ({ isSidebarOpen }) => {
  const appBarStyle = isSidebarOpen ? 
    { width: "calc(100% - 300px)", marginLeft: "300px" } : 
    { width: "100%", marginLeft: "0px" };

  return (
    <AppBar position="fixed" className="topbar-app-bar" style={appBarStyle}>
      <Toolbar>
        <Typography variant="h6">
          Sanama
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
