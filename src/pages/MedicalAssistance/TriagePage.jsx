import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Slider } from '@mui/material';

function TriagePage() {
    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [changes, setChanges] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [medications, setMedications] = useState('');
    const [allergies, setAllergies] = useState('');
    const [surgeries, setSurgeries] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');
    const [painScale, setPainScale] = useState(5);

    const handleSubmit = () => {
        // Aquí puedes manejar el envío de datos, por ejemplo, a tu backend una vez que lo tengas
        console.log({
            symptoms,
            duration,
            changes,
            medicalHistory,
            medications,
            allergies,
            surgeries,
            familyHistory,
            painScale
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Módulo de Triage
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Síntomas Principales" 
                        variant="outlined"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                        fullWidth 
                        label="Duración de los síntomas" 
                        variant="outlined"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                        fullWidth 
                        label="Cambios en los síntomas" 
                        variant="outlined"
                        value={changes}
                        onChange={(e) => setChanges(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Historia Médica" 
                        variant="outlined"
                        multiline
                        rows={4}
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Medicamentos Actuales" 
                        variant="outlined"
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Alergias" 
                        variant="outlined"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Cirugías Previas" 
                        variant="outlined"
                        value={surgeries}
                        onChange={(e) => setSurgeries(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        label="Historia Familiar Relevante" 
                        variant="outlined"
                        value={familyHistory}
                        onChange={(e) => setFamilyHistory(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography gutterBottom>
                        Escala del dolor (1-10)
                    </Typography>
                    <Slider
                        defaultValue={5}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        valueLabelDisplay="auto"
                        value={painScale}
                        onChange={(e, newValue) => setPainScale(newValue)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Registrar Triage
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default TriagePage;
