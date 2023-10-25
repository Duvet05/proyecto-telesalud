import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";

function DynamicBreadcrumbs() {
  const router = useRouter();

  const pathnames = router.asPath.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        marginBottom: "70px",
      }}
    >
      {pathnames.length > 0 ? (
        <Link color="inherit" href="/" underline="hover">
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
          <Link key={name} color="inherit" href={routeTo} underline="hover">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default DynamicBreadcrumbs;
