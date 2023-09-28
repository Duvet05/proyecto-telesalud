import React from "react";
import { Avatar, Drawer, List, Toolbar, Grid, Typography } from "@mui/material";
import assets from "../../assets";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import "./styles.css";
import SidebarToggleButton from "./SidebarToggleButton";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
    {isSidebarOpen?<Drawer
      variant="persistent"
      open={isSidebarOpen} // Añade esta línea para controlar si el Drawer está abierto o cerrado
      classes={{
        paper: "drawer-paper",
      }}
    >
      <List disablePadding>
        <Toolbar className="toolbar-sidebar">
          <div className="stack-sidebar">
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Avatar src={assets.images.logo} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">Sanama</Typography>
              </Grid>
              <Grid item xs={2}>
                <SidebarToggleButton toggleSidebar={toggleSidebar}></SidebarToggleButton>
              </Grid>
            </Grid>
            
          </div>
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
    </Drawer>:<Drawer
      variant="persistent"
      open={!isSidebarOpen} // Añade esta línea para controlar si el Drawer está abierto o cerrado
      classes={{
        paper: "drawer-paper",
      }}
    >
      <List disablePadding>
        <Toolbar className="toolbar-sidebar">
          <div className="stack-sidebar">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Avatar src={assets.images.logo} />
              </Grid>
              <Grid item xs={12}>
                <SidebarToggleButton toggleSidebar={toggleSidebar}></SidebarToggleButton>
              </Grid>
            </Grid>
            
          </div>
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
    </Drawer>}
    </>
  );
};

export default Sidebar;
