import React from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import './styles.css';

const Topbar = () => {
  return (
    <AppBar position="fixed" className="topbar-app-bar">
      <Toolbar>
        <Typography variant="h6">
          Sanama
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
