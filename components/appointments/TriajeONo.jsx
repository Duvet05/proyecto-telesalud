import React, { useState } from "react";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";

const TriageRequest = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <Container maxWidth="xs" style={{ margin: "1rem auto", textAlign:"center" }}>
        <Typography variant="h5" gutterBottom>
          Enviar al paciente a triaje?
        </Typography>
        <Grid container spacing={2}>
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
    </Container>
  );
};

export default TriageRequest;
