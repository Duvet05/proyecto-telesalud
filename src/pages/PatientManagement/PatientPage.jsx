import React from 'react';
import {
  Grid, Typography, Button, Input, Select, MenuItem, Table, TableBody, TableRow, TableCell, Breadcrumbs, Link, Box
} from '@mui/material';

const PatientPage = () => {
  return (
    <Grid>
      {/* Main Content */}
      <Grid>
        {/* Search and Filters */}
        <Box sx={{display: 'flex', gap: '20px', justifyContent: 'space-around', marginBottom: '15px'}}>
        <Box sx={{flex: 1, display: 'flex', gap: '20px'}}>
          <Box>
            <Input placeholder="Search (Name, email, etc.)" fullWidth />
          </Box>
          <Box sx={{minWidth: '200px'}}>
            <Select fullWidth>
              <MenuItem value="property">Property</MenuItem>
              {/* Add other properties as MenuItems */}
            </Select>
          </Box>
        </Box>
          <Box>
            <Button variant='contained'>BORRAR FILTROS</Button>
          </Box>
          <Box>
            <Button variant='contained'>BUSCAR</Button>
          </Box>
          <Box>
            {/* Add icon here */}
          </Box>
        </Box>

        {/* Additional Filters */}
        <Box sx={{display: 'flex', gap: '20px', marginBottom: '15px'}}>
          <Box sx={{minWidth: '200px'}}>
          <Select sx={{minWidth: '200px'}}>
              <MenuItem value="contains">column</MenuItem>
              {/* Add other operators as MenuItems */}
            </Select>
          </Box>
          <Box sx={{minWidth: '200px'}}>
            <Select sx={{minWidth: '200px'}}>
              <MenuItem value="contains">contains</MenuItem>
              {/* Add other operators as MenuItems */}
            </Select>
          </Box>
          <Box>
            <Input placeholder="Filter value" fullWidth />
          </Box>
        </Box>

        {/* Table */}
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Nombre completo</TableCell>
              <TableCell>Fecha de nacimiento</TableCell>
              <TableCell>Código del seguro</TableCell>
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
                <Button  href={"/pacientes/perfil/"+index} variant='contained'>
                  VER PERFIL     
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

//export default PatientsPage;


export default PatientPage
