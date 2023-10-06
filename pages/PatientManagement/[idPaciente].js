import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import assets from "../../public/assets";
import { useRouter } from "next/router";
import PatientAppointmentTable from "@/components/Patients/PatientAppointmentTable";
import { patientService } from "@/services/patientService";
import MainLayout from "@/components/layout/MainLayout";
import { Email, Phone } from "@mui/icons-material";

function PatientForm() {
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const [patientForm, setPatientForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    fechaNacimiento: "",
    sexo: "",
    telefono: "",
    codigoSeguro: "",
    tipoSeguro: "",
    correo: "",
    direccion: "",
  });
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const { idPaciente } = router.query;
    const fetchData = async () => {
      try {
        const data = await patientService.buscarPorFiltro(idPaciente);
        setPatientForm(data[0]);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const data = await patientService.listarCitasPorPaciente(idPaciente);
        setAppointmentList(data);
        setCargando(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchAppointments();
  }, [router.isReady]);

  return (
    <MainLayout>
      <Grid container justifyContent="space-around">
        {/* Foto y datos pequeños */}
        <Grid item md={1}></Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Paper>
            <Grid container direction="column" textAlign="center">
              {/* <Grid item xs={12} pt={3} pb={1.5} alignSelf={"center"}>
                <Avatar
                  src="../assets/images/fotoPrueba.jpg"
                  sx={{ width: 200, height: 200 }}
                ></Avatar>
              </Grid> */}

              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  {`${patientForm.nombres} ${patientForm.apellidoPaterno} ${patientForm.apellidoMaterno}`}
                </Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Email />
                <Typography fontWeight="bold">{patientForm.correo}</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Phone />
                <Typography fontWeight="bold">
                  {patientForm.telefono}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={1}></Grid>
        {/* Informacion a fondo */}

        <Grid item xs={12} sm={12} md={6}>
          <Paper sx={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography>DNI</Typography>
                <Typography fontWeight="bold">{patientForm.dni}</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Genero</Typography>
                <Typography fontWeight="bold">{patientForm.sexo}</Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Direccion</Typography>
                <Typography fontWeight="bold">
                  {patientForm.direccion}
                </Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Tipo de seguro</Typography>
                <Typography fontWeight="bold">
                  {patientForm.tipoSeguro}
                </Typography>
              </Grid>

              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Fecha de nacimiento</Typography>
                <Typography fontWeight="bold">
                  {patientForm.fechaNacimiento}
                </Typography>
              </Grid>
              <Grid item p={2} xs={12} sm={12} md={6}>
                <Typography fontWeight="medium">Nº de seguro</Typography>
                <Typography fontWeight="bold">
                  {patientForm.codigoSeguro}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>

        <Grid item pt={4} xs={10}>
          <PatientAppointmentTable
            appointmentList={appointmentList}
            cargando={cargando}
          ></PatientAppointmentTable>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default PatientForm;
