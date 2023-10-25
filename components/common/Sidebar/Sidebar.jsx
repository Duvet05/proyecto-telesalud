import React from "react";
import {
  Drawer,
  List,
  Toolbar,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import Image from "next/image"; // Importamos Image de Next.js para manejar imágenes
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
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
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
              />{" "}
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
              <IconButton onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        {routesSideBar.map((route, index) =>
          route.sidebarProps ? (
            <SidebarItem
              key={index}
              item={route}
              isSidebarOpen={isSidebarOpen}
            />
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
