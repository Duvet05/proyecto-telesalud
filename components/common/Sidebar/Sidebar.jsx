import React from "react";
import {
  Drawer,
  List,
  Toolbar,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Image from "next/image";
import routesSideBar from "./routesSideBar";
import SidebarItem from "./SidebarItem";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const drawerWidth = isSidebarOpen ? 300 : 60;

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ padding: 2 }}>
          <Grid
            container
            direction={isSidebarOpen ? "row" : "column"}
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              xs={isSidebarOpen ? 2 : 12}
              container
              justifyContent="center"
            >
              <Image
                src="/assets/images/medical-logo-png-878.png"
                alt="Sanama Logo"
                width={40}
                height={40}
              />
            </Grid>

            {isSidebarOpen && (
              <Grid item xs={8}>
                <Typography variant="h5">Sanama</Typography>
              </Grid>
            )}

            <Grid
              item
              xs={isSidebarOpen ? 2 : 12}
              container
              justifyContent={isSidebarOpen ? "flex-end" : "center"}
            >
              <IconButton onClick={toggleSidebar} sx={{ borderRadius: "50%" }}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Box sx={{ overflow: "auto", height: "calc(100vh - 64px)" }}>
          {routesSideBar.map((route, index) =>
            route.sidebarProps ? (
              <SidebarItem
                key={index}
                item={route}
                isSidebarOpen={isSidebarOpen}
              />
            ) : null
          )}
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
