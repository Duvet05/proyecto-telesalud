import React from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const softBlue = "#F0F0F0"; // Azul suave
const labelColor = "#666"; // Color de etiqueta
const Campo = ({ id, label, type, iconButton, value }) => {
  const inputStyles = {
    backgroundColor: softBlue,
    color: "#000",
    "& input": {
      color: "#000",
    },
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: labelColor, marginBottom: 1 }}
      >
        {label}
      </Typography>
      {iconButton ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type={type}
            id={id}
            name={id}
            variant="outlined"
            required
            fullWidth
            readOnly
            disabled
            sx={inputStyles}
            value={value}
            inputProps={{ style: { color: "#000" } }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      ) : (
        <TextField
          type={type}
          id={id}
          name={id}
          variant="outlined"
          required
          fullWidth
          disabled
          sx={inputStyles}
          value={value}
          inputProps={{ style: { color: "#000" } }}
        />
      )}
    </Box>
  );
};

function DatosMedico(props) {
  
  const {doctor} = props;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Columna 1 */}
      <div style={{ flex: 1, marginRight: 16 }}>
        <Campo
          id="nombres"
          label="Nombres"
          type="text"
          iconButton={false}
          value={doctor[0].nombres}
        />
        <Campo
          id="cmp"
          label="CMP"
          type="text"
          iconButton={false}
          value={doctor[0].cmp}
        />
      </div>

      {/* Columna 2 */}
      <div style={{ flex: 1, marginRight: 16 }}>
        <Campo
          id="apellido-paterno"
          label="Primer Apellido"
          type="text"
          iconButton={false}
          value={doctor[0].apellidoPaterno}
        />
        <Campo
          id="especialidad"
          label="Especialidad"
          type="text"
          iconButton={false}
          value={doctor[0].especialidad.nombre}
        />
      </div>

      {/* Columna 3 */}
      <div style={{ flex: 1, marginRight: 16 }}>
        <Campo
          id="apellido-materno"
          label="Segundo Apellido"
          type="text"
          iconButton={false}
          value={doctor[0].apellidoMaterno}
        />
        <Campo
          id="correo-electronico"
          label="Correo Electrónico"
          type="email"
          iconButton={false}
          value={"No tiene"}
        />
      </div>

      {/* Columna 4 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Imagen */}
        <Avatar
          src="/assets/images/doctorface.jpg"
          alt="Foto del doctor"
          sx={{ width: 200, height: 200, marginBottom: 1 }}
        />
      </div>
    </div>
  );
}

export default DatosMedico;
