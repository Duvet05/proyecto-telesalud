import React from "react";
import { styled } from "@mui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
} from "@mui/material";

const StyledDialogContent = styled(DialogContent)({
  padding: "2rem",
});

const BotonContainer = styled(DialogActions)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  "& button": {
    margin: "0.5rem 0",
    width: "80%",
  },
});

function AskForTriage({ open, onClose }) {
  const handleNoMandarClick = () => {
    console.log("No mandar a triaje");
    onClose();
  };

  const handleMandarClick = () => {
    console.log("Mandar a triaje");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" align="center">
          Derivar a Triage
        </Typography>
      </DialogTitle>
      <StyledDialogContent>
        <form>
          <Grid container spacing={2}></Grid>
        </form>
      </StyledDialogContent>
      <BotonContainer>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNoMandarClick}
        >
          No mandar a triaje
        </Button>
        <Button variant="contained" color="primary" onClick={handleMandarClick}>
          Mandar a triaje
        </Button>
      </BotonContainer>
    </Dialog>
  );
}

export default AskForTriage;
