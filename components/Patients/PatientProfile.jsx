import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { useParams } from 'react-router-dom';

function PatientProfile() {

  const {id}=useParams()

  return (
    <Grid container spacing={3}>
      {/* Imagen del paciente */}
      <Container sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            height="240"
            image="url_to_image" 
            alt="Nombre completo"
          />
          <CardContent>
            <Typography variant="h6">Nombre completo</Typography>
            <Typography variant="body1">DNI</Typography>
          </CardContent>
        </Card>
      </Grid>

      {}
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', 
      backgroundColor: '#FFF', justifyContent: 'center', padding: '20px', borderRadius: '2px'}}>
        <Typography variant="body1">Género: Masculino</Typography>
        <Typography variant="body1">Fecha de nacimiento: 06/09/1969</Typography>
        <Typography variant="body1">Dirección: Calle # Distrito, #</Typography>
        <Typography variant="body1">Teléfono: 134563213</Typography>
        {}
      </Box>
      </Container>
      {}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          CITAS DEL PACIENTE
        </Typography>
{/* Table */}
<Table>
          <TableBody>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
            {/* Sample data */}
            {['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'].map((cell, index) => (
              <TableRow key={index}>
                <TableCell>{cell}</TableCell>
                <TableCell>{cell}</TableCell>
                <TableCell>{cell}</TableCell>
                <TableCell>{cell}</TableCell>
                <TableCell>
                <Button  href={"/pacientes/perfil/"+id+"/edit"} variant='contained'>
                  VER DETALLES     
                </Button>        
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

export default PatientProfile;

