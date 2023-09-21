import React from 'react';
import { Avatar, Drawer, List, Toolbar } from "@mui/material";
import assets from "../../assets";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import './styles.css';

const Sidebar = ({isSidebarOpen}) => {
  return (
    <Drawer
      variant="persistent"
      open={isSidebarOpen} // Añade esta línea para controlar si el Drawer está abierto o cerrado
      classes={{
        paper: "drawer-paper",
      }}
    >
      <List disablePadding>
        <Toolbar className="toolbar-sidebar">
          <div className="stack-sidebar">
            <Avatar src={assets.images.logo} />
          </div>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
