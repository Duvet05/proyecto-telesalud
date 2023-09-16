import React from 'react';
import './PatientsTable.css';

function PatientsTable() {
    const mockData = [
        { name: "Juan Pérez", dni: "45678901", age: 28, bloodType: "O+", triage: "Verde", phone: "987654321", address: "Calle Falsa 123" },
        { name: "Ana García", dni: "45678902", age: 35, bloodType: "A-", triage: "Amarillo", phone: "987654322", address: "Calle Verdadera 456" },
        // ... Puedes agregar más datos aleatorios
    ];

    return (
        <div className="table-container">
            <h2>Listado de pacientes</h2>
            {mockData.map((patient, index) => (
                <div key={index} className="patient-card">
                    <div><strong>Nombre completo:</strong> {patient.name}</div>
                    <div><strong>DNI:</strong> {patient.dni}</div>
                    <div><strong>Edad:</strong> {patient.age}</div>
                    <div><strong>Tipo de sangre:</strong> {patient.bloodType}</div>
                    <div><strong>Triaje:</strong> {patient.triage}</div>
                    <div><strong>Teléfono:</strong> {patient.phone}</div>
                    <div><strong>Dirección:</strong> {patient.address}</div>
                </div>
            ))}
        </div>
    );
}

export default PatientsTable;
