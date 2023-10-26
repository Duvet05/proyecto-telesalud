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

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

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
          overflowX: "hidden",
          backgroundColor: "#3d5af1", // Establece el color de fondo
          borderRadius: "0 10px 10px 0", // Establece los bordes redondeados
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
              xs={isSidebarOpen ? 2 : 8}
              container
              justifyContent="center"
            >
              <Box
                sx={{
                  backgroundColor: "white", // Fondo blanco para el logo
                  borderRadius: 3, // Bordes redondeados
                  padding: 1, // Espaciado interior para que no toque los bordes
                  display: "flex", // Asegurar que el contenido esté centrado
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/images/medical-logo-png-878.png"
                  alt="Sanama Logo"
                  width={30}
                  height={30}
                />
              </Box>
            </Grid>

            {isSidebarOpen && (
              <Grid item xs={8}>
                <Typography variant="h5" sx={{ color: "white" }}>
                  Sanama
                </Typography>
              </Grid>
            )}

            <Grid
              item
              xs={isSidebarOpen ? 2 : 12}
              container
              justifyContent={isSidebarOpen ? "flex-end" : "center"}
            >
              <IconButton
                onClick={handleToggleSidebar}
                sx={{ borderRadius: "50%" }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {routesSideBar.map(
            (route, index) =>
              route.sidebarProps && (
                <SidebarItem
                  key={index}
                  item={route}
                  isSidebarOpen={isSidebarOpen}
                />
              )
          )}
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
