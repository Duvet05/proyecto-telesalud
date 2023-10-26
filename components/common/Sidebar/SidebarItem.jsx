import React from "react";
import { useRouter } from "next/router";
import { ListItemButton, ListItemIcon, styled } from "@mui/material";
import Link from "next/link";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.list-item-button": {
    borderRadius: "8px",
    margin: theme.spacing(1, 0),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.list-item-button-active": {
      backgroundColor: theme.palette.action.selected,
      "& .list-item-icon": {
        color: theme.palette.primary.main,
      },
    },
  },
  "& .list-item-icon": {
    color: theme.palette.action.active,
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
        <ListItemIcon className="list-item-icon">
          {item.sidebarProps.icon}
        </ListItemIcon>
        {isSidebarOpen && item.sidebarProps.displayText}
      </StyledListItemButton>
    </Link>
  );
};

export default SidebarItem;
