import React, { useState } from "react";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";

const TriageRequest = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h6" gutterBottom align="center">
          ¿Desea enviar al paciente a triaje?
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={6}>
            <Button
              variant={selectedButton === "option1" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleButtonClick("option1")}
              fullWidth
            >
              Sí
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={selectedButton === "option2" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => handleButtonClick("option2")}
              fullWidth
            >
              No
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TriageRequest;
