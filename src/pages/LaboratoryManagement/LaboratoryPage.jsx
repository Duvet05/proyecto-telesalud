// import React, { useEffect, useState } from "react";
// import SeleccionarHorarioMedico from "../../components/doctor/SeleccionarHorarioMedico"
// import PerfilMedico from "./PerfilMedico";
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { useParams } from "react-router-dom";
// import { getDoctors } from "../../components/doctor/DoctorFunctions";
// const LaboratoryPage = (props) => {
//   const { idPersona } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor encontrado

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const data = await getDoctors();
//       setDoctors(data);

//       // Buscar el doctor con el idPersona deseado
//       const doctorFound = data.find((doctor) => doctor.idPersona == idPersona);
//       setSelectedDoctor(doctorFound); // Establecer el doctor encontrado

//       setIsLoading(true);
//     } catch (error) {
//       console.error("Failed to fetch doctors:", error);
//       setIsLoading(false);
//       // Considerar mostrar un mensaje de error al usuario aquí
//     }
//   };

//   const [selectedAvailability, setSelectedAvailability] = useState(null);
//   const handleShowAvailability = (availability) => {
//     setSelectedAvailability(availability);
//   };

//   if (!isLoading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div>
//       <Grid container justifyContent="center" style={{ height: '100vh' }}>
//         <Grid item xs={11}>
//           <Paper elevation={3} style={{ padding: '30px', background: 'white' }}>
//             {/* Contenido dentro del Paper */}
//             <h1>Componente perfil del médico</h1>
//             <hr />
//             <h3>Datos personales</h3>
//             <PerfilMedico doctor={selectedDoctor} />
//             <h3>Disponibilidad</h3>
//             <SeleccionarHorarioMedico />
//             {/* Fin del contenido dentro del Paper */}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default LaboratoryPage;

import react from "react";

function LaboratoryPage() {
  return <div>Hola</div>;
}

export default LaboratoryPage;
