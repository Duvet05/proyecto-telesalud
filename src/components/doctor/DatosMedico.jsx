import React from "react";
import { Box, TextField, Typography, Grid, IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const softBlue = "#e6f7ff"; // Azul suave
const labelColor = "#666"; // Color de etiqueta
const Campo = ({ id, label, type, iconButton, value }) => {


    const inputStyles = {
        backgroundColor: softBlue,
        "& input": {
            color: labelColor,
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
            <Typography variant="subtitle1" gutterBottom sx={{ color: labelColor, marginBottom: 1 }}>
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
                />
            )}
        </Box>
    );
};

function DatosMedico(props) {
    const {doctor} = props;
    console.log(doctor)
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Columna 1 */}
            <div style={{ flex: 1, marginRight: 16 }}>
                <Campo id="nombres" label="Nombres" type="text" iconButton={false} value={doctor.nombres} />
                <Campo id="cmp" label="CMP" type="text" iconButton={false} value={doctor.cmp} />
            </div>

            {/* Columna 2 */}
            <div style={{ flex: 1, marginRight: 16 }}>
                <Campo id="apellido-paterno" label="Primer Apellido" type="text" iconButton={false} value={doctor.apellidoPaterno}/>
                <Campo id="especialidad" label="Especialidad" type="text" iconButton={false} value={"NO TIENE"} />
            </div>

            {/* Columna 3 */}
            <div style={{ flex: 1, marginRight: 16 }}>
                <Campo id="apellido-materno" label="Segundo Apellido" type="text" iconButton={false} value={doctor.apellidoMaterno} />
                <Campo id="correo-electronico" label="Correo Electrónico" type="email" iconButton={false} value={"NO TIENE"} />
            </div>

            {/* Columna 4 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {/* Imagen */}
                <Avatar src="ruta_de_la_imagen_referencial.jpg" alt="Foto del doctor" sx={{ width: 150, height: 150, marginBottom: 1 }} />
            </div>
        </div>
    );
}

export default DatosMedico;
