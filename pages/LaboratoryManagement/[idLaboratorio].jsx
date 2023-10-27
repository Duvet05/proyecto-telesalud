import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
  Input,
  FormControl,
  InputLabel,
  Box,
  Container,
  List,
  ListItem,
} from '@mui/material';

function AtenderLaboratorio() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [observations, setObservations] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    updateFileList(newFiles);
  };

  const updateFileList = (newFiles) => {
    const fileNames = newFiles.map((file) => file.name);
    setFileList((prevList) => [...prevList, ...fileNames]);
  };

  const router = useRouter();
  const { idLaboratorio } = router.query;

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSave = () => {
    // Implementa la lógica de guardar los datos
  };

  const handleCancel = () => {
    // Implementa la lógica de cancelar
  };

  return (
    <MainLayout>
      <Container maxWidth={false} style={{ height: "auto" }}>

        <Typography
          variant="h4"
          sx={{
            color: "#000",
            gap: "0.1mm",
            marginBottom: "5px",
            marginTop: "-50px",
          }}
        >
          Registrar Examen N°{idLaboratorio}
        </Typography>

        <Container style={{ padding: "10px 30px 30px 30px", background: "white" }}>
          <Typography variant="h2"></Typography>
          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Paciente</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Nombre del Paciente"
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Solicitado por</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Solicitante"
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Doctor firmante</Typography>
          <FormControl>
            <Select
              readOnly
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              <MenuItem value="Doctor1">Doctor 1</MenuItem>
              <MenuItem value="Doctor2">Doctor 2</MenuItem>
              <MenuItem value="Doctor3">Doctor 3</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Tipo de examen</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Examen"
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Instrucciones</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Instrucciones"
          />

          <Typography variant="h5" color="textPrimary" margin="10px 0px">
            Observaciones
          </Typography>
          <TextField
            label="Observaciones"
            multiline
            rows={2} // Número de filas
            placeholder="Agrega tus observaciones"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />

          <Typography variant="h5">Adjuntar Archivos</Typography>
          <Input type="file" onChange={handleFileChange} multiple />
          <List>
            {fileList.map((fileName, index) => (
              <ListItem key={index} style={{color:"black", padding:"0px"}}>
                {fileName}
              </ListItem>
            ))}
          </List>

          <Box mt={2}>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Container>
      </Container>
    </MainLayout>
  );
}

export default AtenderLaboratorio;