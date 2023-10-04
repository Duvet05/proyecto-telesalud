import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate } from "react-router-dom";

function DynamicBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        marginBottom: "70px",
      }}
    >
      {pathnames.length > 0 ? (
        <Link color="inherit" onClick={() => navigate("/")}>
          Home
        </Link>
      ) : (
        <Typography color="textPrimary">Home</Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name} color="textPrimary">
            {name}
          </Typography>
        ) : (
          <Link key={name} color="inherit" onClick={() => navigate(routeTo)}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default DynamicBreadcrumbs;