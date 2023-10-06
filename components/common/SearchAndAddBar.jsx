import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const SearchAndAddBar = ({ searchTerm, onSearchChange }) => (
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por nombre, email, especialidad..."
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
    <Grid item xs={12} md={6} container justifyContent="flex-end">
      <Link href="/NewAppointmentPage">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2196f3",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#b3b3b3",
            },
          }}
          startIcon={<AddIcon />}
        >
          Nueva cita
        </Button>
      </Link>
    </Grid>
  </Grid>
);

export default SearchAndAddBar;
