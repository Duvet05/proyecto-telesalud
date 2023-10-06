import React from "react";
import { ButtonGroup, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NavigationButtons = ({ currentPage, totalPages, navigate }) => (
  <Box sx={{ mt: 2 }}>
    <ButtonGroup variant="contained" color="primary" size="large" fullWidth>
      <Button
        startIcon={<ArrowBackIcon />}
        disabled={currentPage === 0}
        onClick={() => navigate(-1)}
        variant={currentPage === 0 ? "outlined" : "contained"}
        sx={{ transition: "all 0.3s" }}
      >
        Atrás
      </Button>
      <Button
        endIcon={<ArrowForwardIcon />}
        disabled={currentPage === totalPages - 1}
        onClick={() => navigate(1)}
        variant={currentPage === totalPages - 1 ? "outlined" : "contained"}
        sx={{ transition: "all 0.3s" }}
      >
        Siguiente
      </Button>
    </ButtonGroup>
  </Box>
);

export default NavigationButtons;
