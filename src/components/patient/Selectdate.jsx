import React, { useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const Selectdate = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 1);

  return (
    <Box sx={{ bgcolor: "dark", height: "100vh", p: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={3} sx={{ bgcolor: "white", height: "80vh" }} />
        <Grid
          item
          xs={9}
          sx={{
            bgcolor: "#6c757d",
            height: "80vh",
            border: 3,
            borderColor: "yellow",
            borderStyle: "solid",
          }}
        >
          <Box display="flex" justifyContent="center" mt={5}>
            <Calendar
              tileDisabled={({ date }) =>
                date.getDay() === 0 || date < previousDate
              }
              onChange={setSelectedDate}
              value={selectedDate}
            />
          </Box>
          <Typography align="center" mt={2}>
            {formatDate(selectedDate)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Selectdate;
