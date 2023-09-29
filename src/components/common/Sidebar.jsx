import React from "react";
import {
  Avatar,
  Drawer,
  List,
  Toolbar,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import assets from "../../assets";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import "./configs/Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <Drawer
      variant="persistent"
      open={true}
      classes={{
        paper: isSidebarOpen ? "drawer-paper" : "drawer-paper-collapsed",
      }}
    >
      <List disablePadding>
        <Toolbar className="toolbar-sidebar">
          <Grid
            container
            direction={isSidebarOpen ? "row" : "column"}
            alignItems="center"
            spacing={2}
          >
            {/* Logo */}
            <Grid
              item
              xs={isSidebarOpen ? 2 : 12}
              container
              justifyContent="center"
            >
              <Avatar src={assets.images.logo} />
            </Grid>

            {/* Nombre del software */}
            {isSidebarOpen && (
              <Grid item xs={8}>
                <Typography variant="h5">Sanama</Typography>
              </Grid>
            )}

            {/* Boton menu */}
            <Grid
              item
              xs={isSidebarOpen ? 2 : 12}
              container
              justifyContent={isSidebarOpen ? "flex-end " : "center"}
            >
              <IconButton onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            <SidebarItem
              item={route}
              key={index}
              isSidebarOpen={isSidebarOpen}
            />
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
