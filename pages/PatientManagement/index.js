import React from "react";
import {
  Grid,
  Typography,
  Button,
  Input,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  TextField,
} from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import PatientTable from "@/components/Patients/PatientTable";
import SearchIcon from "@mui/icons-material/Search";

const PatientManagement = () => {
  return (
    <MainLayout>
      <Typography variant="h4" sx={{ color: "#000", mt: "-50px", mb: "30px" }}>
        Pacientes
      </Typography>

      <Paper sx={{ mt: "15px", mb: "15px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            pt: "10px",
            pb: "20px",
            pl: "20px",
            pr: "20px",
          }}
        >
          <Grid item xs={4}>
            <TextField
              label="Buscar por Nombre o DNI..."
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    bgcolor: "#2196f3",
                    color: "#ffffff",
                    fontSize: "1.0em",
                    textTransform: "none",
                    minWidth: "100px",
                    "&:hover": {
                      bgcolor: "#b3b3b3",
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
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <PatientTable className="tablaPacientes" />
    </MainLayout>
  );
};

export default PatientManagement;
