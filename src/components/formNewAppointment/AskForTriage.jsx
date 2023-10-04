import React from "react";
import { styled } from "@mui/system";
import { Button, Container, Grid, Typography, Paper } from "@mui/material";

const StyledPaper = styled(Paper)({
  padding: "2rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave para el contenedor
  borderRadius: "8px",
});

const BotonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
  "& button": {
    margin: "0.5rem 0", // Espaciado vertical entre los botones
    width: "80%", // Asegurando que los botones tengan un ancho consistente
  },
});

function AskForTriage() {
  // Funciones para manejar los clics en los botones
  const handleNoMandarClick = () => {
    console.log("No mandar a triaje");
  };

  const handleMandarClick = () => {
    console.log("Mandar a triaje");
  };

  return (
    <Container>
      <StyledPaper>
        <Typography variant="h5" align="center" gutterBottom>
          Derivar a Triage
        </Typography>

        <form>
          <Grid container spacing={2}>
            {/* Agrega tus campos de formulario aquí */}
          </Grid>
        </form>

        <BotonContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNoMandarClick}
          >
            No mandar a triaje
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMandarClick}
          >
            Mandar a triaje
          </Button>
        </BotonContainer>
      </StyledPaper>
    </Container>
  );
}

export default AskForTriage;
