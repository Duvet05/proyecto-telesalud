import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MainLayout from "@/components/layout/MainLayout";
import { triajeService } from "@/services/triajeService";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const DetalleTriaje = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTriaje, setSelectedTriaje] = useState(null);

  useEffect(() => {
    if (codigo) {
      fetchTriaje(codigo);
    }
  }, [codigo]);

  const getDolorColor = (number) => {
    if (number >= 1 && number <= 3) return "#FFB3B3"; 
    if (number >= 4 && number <= 6) return "#FF6666"; 
    if (number >= 7 && number <= 10) return "#FF0000"; 
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
};

  const [openDialog, setOpenDialog] = useState(false);

  const handleGuardar = async () => {
    const data = {
        pn_id_triaje: selectedTriaje.id_triaje, 
        pn_peso: selectedTriaje.peso,
        pn_talla: selectedTriaje.talla,
        pn_temperatura: selectedTriaje.temperatura,
        pv_motivo_visita: selectedTriaje.motivo_visita,
        pn_presion_arterial: selectedTriaje.presionArterial,
        pv_condicionesPrexistentes: selectedTriaje.condicionesPrexistentes,
        pv_prioridad: selectedTriaje.prioridad,  
        pn_estado: selectedTriaje.estado,
        pn_saturacionOxigeno: selectedTriaje.saturacionOxigeno,
        pn_frecuenciaCardiaca: selectedTriaje.frecuenciaCardiaca,
        pv_nivelConciencia: selectedTriaje.nivelConciencia,
        pv_nivelDolor: selectedTriaje.nivelDolor,
    };

    try {
        const resultado = await triajeService.actualizarTriaje(data);
        console.log(resultado);
        setOpenDialog(true); 
    } catch (error) {
        console.error("Error al guardar los cambios", error);
        alert("Ocurrió un error");
    }
    
    }

  const handleDolor = (number) => {
    setSelectedTriaje((prevState) => ({
      ...prevState,
      nivelDolor: number.toString(),
    }));
  };

  const fetchTriaje = async (codigo) => {
    try {
      const data = await triajeService.buscarTriaje(codigo);
      console.log(data);
      setSelectedTriaje(data);
      setIsLoading(true);
    } catch (error) {
      console.error("Error al buscar los datos de triaje:", error);
      setIsLoading(false);
    }
  };

  if (!isLoading) {
    console.log(router);
    return <MainLayout>Cargando...</MainLayout>;
  }

  return (
    <MainLayout>
        <div>
            <Grid
            container
            justifyContent="center"
            style={{ height: "auto", marginTop: "10px" }}
            >
            <Grid item xs={11}>
                <Paper
                elevation={3}
                style={{ padding: "10px 30px 30px 30px", background: "white" }}
                >
                {selectedTriaje && (
                    <div>
                    <h4 style={{ marginBottom: "20px" }}>
                        Información Básica del Paciente
                    </h4>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Nombres"
                            variant="outlined"
                            value={selectedTriaje.paciente.nombres}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                paciente: {
                                ...prevState.paciente,
                                nombres: e.target.value,
                                },
                            }))
                            }
                            disabled
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Primer Apellido"
                            variant="outlined"
                            value={selectedTriaje.paciente.apellidoPaterno}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                paciente: {
                                ...prevState.paciente,
                                primerApellido: e.target.value,
                                },
                            }))
                            }
                            disabled
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Segundo Apellido"
                            variant="outlined"
                            value={selectedTriaje.paciente.apellidoMaterno}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                paciente: {
                                ...prevState.paciente,
                                segundoApellido: e.target.value,
                                },
                            }))
                            }
                            disabled
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Edad"
                            variant="outlined"
                            value={calcularEdad(selectedTriaje.paciente.fechaNacimiento)}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                paciente: {
                                ...prevState.paciente,
                                edad: e.target.value,
                                },
                            }))
                            }
                            disabled
                        />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="gender-select">Género</InputLabel>
                                <Select
                                    fullWidth
                                    label="Género"
                                    value={selectedTriaje.paciente.sexo}
                                    onChange={(e) =>
                                        setSelectedTriaje((prevState) => ({
                                            ...prevState,
                                            paciente: {
                                                ...prevState.paciente,
                                                sexo: e.target.value,
                                            },
                                        }))
                                    }
                                    disabled
                                    labelId="gender-select-label"
                                    id="gender-select"
                                >
                                    <MenuItem value="MASCULINO">Masculino</MenuItem>
                                    <MenuItem value="FEMENINO">Femenino</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Documento de identidad"
                            variant="outlined"
                            value={selectedTriaje.paciente.dni}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                paciente: {
                                ...prevState.paciente,
                                documentoIdentidad: e.target.value,
                                },
                            }))
                            }
                            disabled
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Peso"
                            variant="outlined"
                            value={selectedTriaje.peso}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                peso: e.target.value,
                            }))
                            }
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Talla"
                            variant="outlined"
                            value={selectedTriaje.talla}
                            onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                                ...prevState,
                                talla: e.target.value,
                            }))
                            }
                        />
                        </Grid>
                    </Grid>

                    <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        Motivo de consulta
                        </h4>
                        <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Razón específica por la que el paciente busca atención médica.
                                            Síntomas primarios y su duración.
                                            Descripción de cualquier trauma o accidente si corresponde."
                        value={selectedTriaje.motivoVisita}
                        onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                            ...prevState,
                            motivoConsulta: e.target.value,
                            }))
                        }
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ marginBottom: "20px" }}>Signos Vitales</h4>
                        <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                            fullWidth
                            label="Temperatura"
                            variant="outlined"
                            value={selectedTriaje.temperatura}
                            onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                ...prevState,
                                temperatura: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">°C</InputAdornment>
                                ),
                            }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                            fullWidth
                            label="Frecuencia Cardiaca"
                            variant="outlined"
                            value={selectedTriaje.frecuenciaCardiaca}
                            onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                ...prevState,
                                frecuenciaCardiaca: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    lpm
                                </InputAdornment>
                                ),
                            }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                            fullWidth
                            label="Saturación de Oxígeno"
                            variant="outlined"
                            value={selectedTriaje.saturacionOxigeno}
                            onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                ...prevState,
                                saturacionOxigeno: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">%</InputAdornment>
                                ),
                            }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                            fullWidth
                            label="Presión arterial"
                            variant="outlined"
                            value={selectedTriaje.presionArterial}
                            onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                ...prevState,
                                presionArterial: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    mm Hg
                                </InputAdornment>
                                ),
                            }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                            fullWidth
                            label="Frecuencia Respiratoria"
                            variant="outlined"
                            value={selectedTriaje.frecuenciaRespiratoria}
                            onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                ...prevState,
                                frecuenciaRespiratoria: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    rpm
                                </InputAdornment>
                                ),
                            }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                label="Nivel de conciencia"
                                value={selectedTriaje.nivelConciencia}
                                onChange={(e) =>
                                setSelectedTriaje((prevState) => ({
                                    ...prevState,
                                    nivelConciencia: e.target.value,
                                }))
                                }
                                variant="outlined"
                            >
                                <MenuItem value="Alerta">Alerta</MenuItem>
                                <MenuItem value="Responde a la voz">
                                Responde a la voz
                                </MenuItem>
                                <MenuItem value="Responde al dolor">
                                Responde al dolor
                                </MenuItem>
                                <MenuItem value="Inconsciente">
                                Inconsciente
                                </MenuItem>
                            </TextField>
                            </Grid>
                        </Grid>
                        </Grid>
                    </div>

                    <Grid container spacing={4}>
                        {/* Evaluación del dolor */}
                        <Grid item xs={12}>
                        <h4 style={{ marginBottom: "20px" }}>
                            Evaluación del dolor
                        </h4>
                        <Grid container spacing={1}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                            <Grid item key={number}>
                                <Button
                                variant="outlined"
                                style={{
                                    minWidth: "32px",
                                    backgroundColor:
                                    selectedTriaje.nivelDolor ===
                                    number.toString()
                                        ? getDolorColor(number)
                                        : "transparent",
                                    color:
                                    selectedTriaje.nivelDolor ===
                                    number.toString()
                                        ? "white"
                                        : "black",
                                }}
                                onClick={() => handleDolor(number)}
                                >
                                {number}
                                </Button>
                            </Grid>
                            ))}
                        </Grid>
                        </Grid>
                    </Grid>
                    <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        Condiciones preexistentes
                        </h4>
                        <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Enfermedades crónicas, Cirugías previas, Alergias, Medicamentos actuales, Condiciones psiquiátricas"
                        value={selectedTriaje.condicionesPrexistentes}
                        onChange={(e) =>
                            setSelectedTriaje((prevState) => ({
                            ...prevState,
                            condicionesPrexistentes: e.target.value,
                            }))
                        }
                        />
                    </div>

                    <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            fullWidth
                            sx={{
                                backgroundColor: "#2196f3",
                                color: "#ffffff",
                                fontSize: "1.0em",
                                textTransform: "none",
                                "&:hover": {
                                backgroundColor: "#b3b3b3",
                                },
                                "& .MuiButton-startIcon": {
                                margin: 0,
                                marginRight: "4px",
                                },
                            }}
                            startIcon={<SaveIcon />} 
                            onClick={handleGuardar}
                        >
                            Guardar
                        </Button>

                        <Button
                            fullWidth
                            sx={{
                                backgroundColor: "#f32121",
                                color: "#ffffff",
                                fontSize: "1.0em",
                                textTransform: "none",
                                "&:hover": {
                                backgroundColor: "#b3b3b3",
                                },
                                "& .MuiButton-startIcon": {
                                margin: 0,
                                marginRight: "4px",
                                },
                            }}
                            startIcon={<CancelIcon />}
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                        <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Notificación"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Actualización Terminada
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setOpenDialog(false);
                                router.back();
                            }} color="primary" autoFocus>
                                Aceptar
                            </Button>
                        </DialogActions>
                        </Dialog>
                    </div>
                    </div>
                )}
                </Paper>
            </Grid>
            </Grid>
        </div>
    </MainLayout>
  );
};

export default DetalleTriaje;
