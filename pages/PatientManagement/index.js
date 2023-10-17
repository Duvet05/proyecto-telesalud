import { useEffect, useState } from "react"
import { Grid, Typography, Button, Paper, TextField } from "@mui/material"
import MainLayout from "@/components/layout/MainLayout"
import PatientTable from "@/components/Patients/PatientTable"
import SearchIcon from "@mui/icons-material/Search"
import { patientService } from "@/services/patientService"
import { setLoading, setPatients } from "@/redux/features/patient/patientSlice"
import { useDispatch } from "react-redux"

const PatientManagement = () => {
  const [filtro, setFiltro] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const data = await patientService.listar({})
      dispatch(setPatients(data))
      dispatch(setLoading(false))
      return data
    } catch (err) {
      console.error(err)
      throw new Error("Hubo un error al cargar los datos. Inténtelo de nuevo.")
    }
  }

  const handleSearch = async () => {

    try {
      dispatch(setLoading(true))
      const data = await patientService.buscarPorFiltro(filtro)
      dispatch(setPatients(data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }



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
              value={filtro}
              onChange={(event) => {
                setFiltro(event.target.value)
              }}
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
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <PatientTable className="tablaPacientes" filtro={filtro} />
    </MainLayout>
  )
}

export default PatientManagement
