import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link"; // Importa Link de next/link

const SidebarItem = ({ item, isSidebarOpen }) => {
  const { appState } = useSelector((state) => state.appState);

  return item.sidebarProps && item.path ? (
    isSidebarOpen ? (
      <Link href={item.path}>
        {" "}
        <ListItemButton
          className={`list-item-button ${
            appState === item.state ? "list-item-button-active" : ""
          }`}
        >
          <ListItemIcon className="list-item-icon">
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          {item.sidebarProps.displayText}
        </ListItemButton>
      </Link>
    ) : (
      <Link href={item.path}>
        {" "}
        <ListItemButton
          className={`list-item-button ${
            appState === item.state ? "list-item-button-active" : ""
          }`}
        >
          <ListItemIcon className="list-item-icon">
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
        </ListItemButton>
      </Link>
    )
  ) : null;
};

export default SidebarItem;
