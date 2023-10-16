import React from "react";
import { Grid, Typography, Button, TextField, Box, Paper } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import SearchIcon from "@mui/icons-material/Search";
import SearchAndAddBar from "@/components/common/SearchAndAddBar";

const AppointmentManagements = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <MainLayout>
      <Typography
        variant="h4"
        sx={{
          color: "#000",
          gap: "0.1mm",
          marginBottom: "30px",
          marginTop: "-50px",
        }}
      >
        Citas
      </Typography>
      <Paper
        sx={{
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <SearchAndAddBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Paper>
      <AppointmentsTable searchTerm={searchTerm} />
    </MainLayout>
  );
};

export default AppointmentManagements;
