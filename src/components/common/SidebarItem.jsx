import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

const SidebarItem = ({ item }) => {
  const { appState } = useSelector((state) => state.appState);

  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      className={`list-item-button ${
        appState === item.state ? "list-item-button-active" : ""
      }`}
    >
      <ListItemIcon className="list-item-icon">
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
