import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import AppointmentsTable from "../../components/appointments/AppointmentsTable";
import SearchAndAddBar from "@/components/common/SearchAndAddBar";

function AppointmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          sx={{ color: "#000", marginBottom: "15px", marginTop: "-70px" }}
        >
          Citas
        </Typography>
        <SearchAndAddBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <AppointmentsTable />
      </div>
    </MainLayout>
  );
}

export default AppointmentManagement;
