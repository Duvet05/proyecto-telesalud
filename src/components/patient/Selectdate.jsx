import React, { useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";

const Selectdate = (props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (updatedDate) => {
    setDate(updatedDate);
  };

  const pervious = new Date();
  pervious.setDate(pervious.getDate() - 1);

  return (
    <Box sx={{ bgcolor: "dark", height: "100vh", p: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={3} sx={{ bgcolor: "white", height: "80vh" }}></Grid>
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
          <Box display="flex" justifyContent="center">
            <Calendar
              tileDisabled={({ date }) =>
                date.getDay() === 0 || date < pervious
              }
              onChange={onChange}
              value={date}
            />
          </Box>
          <Typography align="center" mt={2}>
            {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
          </Typography>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Selectdate;
