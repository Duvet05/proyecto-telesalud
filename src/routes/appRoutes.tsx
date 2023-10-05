// External libraries
import React from "react";
import { RouteType } from "./config";

//Iconos
import {
  Diversity1,
  MedicalServices,
  Today,
  WorkHistory,
  MonitorHeart,
  Vaccines,
  Settings,
} from "@mui/icons-material";

// Pages
import HomePage from "../pages/home/HomePage";
import PatientPage from "../pages/PatientManagement/PatientPage";
import StaffManagement from "../pages/StaffManagement/StaffManagement";
import StaffPage from "../pages/StaffManagement/StaffPage";
import AppointmentsPage from "../pages/MedicalAssistance/AppointmentsPage";
import SchedulePage from "../pages/StaffManagement/SchedulePage";
import TriagePage from "../pages/MedicalAssistance/TriagePage";
import NewAttentionPage from "../pages/MedicalAssistance/NewAttentionPage";
import LaboratoryPage from "../pages/LaboratoryManagement/LaboratoryPage";
import ConfigurationPage from "../pages/ConfigurationManagement/ConfigurationPage";
import PerfilMedico from "../components/doctor/PerfilMedico";
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/pacientes",
    element: <PatientPage />,
    state: "patient",
    sidebarProps: {
      displayText: "Pacientes",
      icon: <Diversity1 />,
    },
  },
  {
    path: "/medicos",
    element: <StaffPage />,
    state: "staff",
    sidebarProps: {
      displayText: "Medicos",
      icon: <MedicalServices />,
    },
  },

  {
    path: "/horarios",
    element: <SchedulePage />,
    state: "staff.schedules",
    sidebarProps: {
      displayText: "Horarios",
      icon: <Today />,
    },
  },
  {
    path: "/citas",
    element: <AppointmentsPage />,
    state: "staff.attentions",
    sidebarProps: {
      displayText: "Citas",
      icon: <WorkHistory />,
    },
  },

  {
    path: "/citas/new",
    element: <NewAttentionPage />,
    state: "assistance.new",
    sidebarProps: {
      displayText: "Nueva Atencion",
      icon: <WorkHistory />,
    },
  },
  {
    path: "/triaje",
    element: <TriagePage />,
    state: "assistance.triage",
    sidebarProps: {
      displayText: "Triaje",
      icon: <MonitorHeart />,
    },
  },
  {
    path: "/laboratorio",
    element: <LaboratoryPage />,
    state: "laboratory",
    sidebarProps: {
      displayText: "Laboratorio",
      icon: <Vaccines />,
    },
  },
  {
    path: "/configuracion",
    element: <ConfigurationPage />,
    state: "configuration",
    sidebarProps: {
      displayText: "Configuracion",
      icon: <Settings />,
    },
  },
  {
    path: "/medicos/:idPersona", // Utiliza un marcador de posición :id en la URL
    element: <PerfilMedico />, // Renderiza tu componente de perfil de médico
    state: "staff.profile", // Define un estado o nombre para esta ruta
    // sidebarProps: {
    //   displayText: "Perfil del Médico",
    //   icon: <MedicalServices />,
    // },
  },
];

export default appRoutes;
