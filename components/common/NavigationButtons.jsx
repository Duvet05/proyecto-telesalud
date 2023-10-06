import React from "react";
import { ButtonGroup, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function NavigationButtons(props) {
  const { currentPage, totalPages, navigate } = props;

  if (currentPage === totalPages - 1) return null;

  const isAtStart = currentPage === 0;
  const isPenultimate = currentPage === totalPages - 2;

  const forwardButtonProps = isPenultimate
    ? { endIcon: null, children: "Terminar", variant: "outlined" }
    : {
        endIcon: <ArrowForwardIcon />,
        children: "Siguiente",
        variant: "contained",
      };

  return (
    <Box sx={{ mt: 2 }}>
      <ButtonGroup variant="contained" color="primary" size="large" fullWidth>
        <Button
          startIcon={<ArrowBackIcon />}
          disabled={isAtStart}
          onClick={() => navigate(-1)}
          variant={isAtStart ? "outlined" : "contained"}
          sx={{ transition: "all 0.3s" }}
        >
          Atrás
        </Button>

        <Button
          {...forwardButtonProps}
          onClick={() => navigate(1)}
          sx={{ transition: "all 0.3s" }}
        />
      </ButtonGroup>
    </Box>
  );
}

export default NavigationButtons;
