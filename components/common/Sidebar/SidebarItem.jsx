import React from "react";
import { useRouter } from "next/router";
import { ListItemButton, ListItemIcon, styled } from "@mui/material";
import Link from "next/link";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif", // Agrega esta línea para establecer la fuente
  color: "white", // Texto blanco
  "&:hover": {
    backgroundColor: "#3c50cb", // Color de fondo al pasar el cursor
    ".MuiListItemIcon-root": {
      color: "white", // Ícono blanco al pasar el cursor
    },
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#3c50cb", // Mantén el color al seleccionar
    color: "white", // Texto blanco al seleccionar
    ".MuiListItemIcon-root": {
      color: "white", // Ícono blanco al seleccionar
    },
  },
}));

const SidebarItem = ({ item, isSidebarOpen }) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const isActive = currentPage === item.path;

  if (!item.sidebarProps || !item.path) return null;

  return (
    <Link href={item.path} passHref>
      <StyledListItemButton
        className={`list-item-button ${
          isActive ? "list-item-button-active" : ""
        }`}
        aria-label={item.sidebarProps.displayText}
      >
        <ListItemIcon className="list-item-icon" sx={{ color: "white" }}>
          {item.sidebarProps.icon}
        </ListItemIcon>
        {isSidebarOpen && item.sidebarProps.displayText}
      </StyledListItemButton>
    </Link>
  );
};

export default SidebarItem;
