import React from "react";
import {
  TextField,
  Paper,
  Button,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const SearchAndAddBar = ({
  searchTerm,
  onSearchChange,
  linkHref = "/NewAppointmentPage",
}) => (
  <Paper sx={{ my: 2, p: 2 }}>
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Search Input */}
      <Grid item xs={2} md={7}>
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

      {/* Search Button */}
      <Grid item xs={12} md={2}>
        <Button
          fullWidth
          sx={{
            backgroundColor: "#2196f3",
            color: "#ffffff",
            fontSize: "1.0em",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#b3b3b3",
            },
            "& .MuiButton-startIcon": {
              margin: 0,
              marginRight: "4px",
            },
          }}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </Grid>

      {/* Add Button */}
      <Grid item xs={12} md={2}>
        <Link href={linkHref}>
          <Button
            fullWidth
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
  </Paper>
);

export default SearchAndAddBar;
