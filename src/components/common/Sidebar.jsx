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
              <Avatar src={assets.images.logo} />
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
        {appRoutes.map((route) =>
          route.sidebarProps ? (
            <SidebarItem item={route} isSidebarOpen={isSidebarOpen} />
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
