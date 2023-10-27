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


  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    // Filtrar solo los archivos con extensión .pdf
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');

    if (pdfFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
    } else {
      alert('Selecciona archivos PDF válidos.');
    }
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
  const handleOpenFile = (e, file) => {
    e.preventDefault();
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  return (
    <MainLayout>
      <Container maxWidth={false} style={{ height: "auto", width: "80%", color: "black" }}>

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
            style={{ width: "100%" }}
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Solicitado por</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Solicitante"
            style={{ width: "100%" }}
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Doctor firmante</Typography>
          <FormControl>
            <Select
              readOnly
              value={selectedDoctor}
              onChange={handleDoctorChange}
              style={{ width: "100%" }}
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
            style={{ width: "100%" }}
          />

          <Typography variant="h5" color={"black"} margin={"10px 0px"}>Instrucciones</Typography>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value="Instrucciones"
            style={{ width: "100%" }}
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
            style={{ width: "100%" }}
          />

          <Typography variant="h5" color="textPrimary" margin="10px 0px">Adjuntar Archivos</Typography>
          <Input type="file" onChange={handleFileChange} />
          <p>{`Número de archivos seleccionados: ${selectedFiles.length}`}</p>
          <ol>
            {selectedFiles.map((file, index) => (
              <li key={index} style={{ marginBottom: "2px" }}>
                {file.name}
                <Button variant="" onClick={(e) => handleOpenFile(e, file)}>Ver</Button>
                <Button onClick={() => handleRemoveFile(index)}>Quitar</Button>
              </li>
            ))}
          </ol>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginLeft: '8px' }}>
              Guardar
            </Button>
          </Box>
        </Container>
      </Container>
    </MainLayout>
  );
}

export default AtenderLaboratorio;