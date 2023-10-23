import React from "react";
import {
  Diversity1,
  MedicalServices,
  Today,
  WorkHistory,
  MonitorHeart,
  Vaccines,
  Settings,
} from "@mui/icons-material";

const routesSideBar = [
  {
    index: true,
    path: "/",
    state: "home",
  },
  {
    path: "/PatientManagement",
    state: "patient",
    sidebarProps: {
      displayText: "Pacientes",
      icon: <Diversity1 />,
    },
  },
  {
    path: "/StaffManagement",
    state: "staff",
    sidebarProps: {
      displayText: "Medicos",
      icon: <MedicalServices />,
    },
  },
  {
    path: "/AppointmentManagement",
    state: "staff.attentions",
    sidebarProps: {
      displayText: "Citas",
      icon: <WorkHistory />,
    },
  },
  {
    path: "/TriageManagement",
    state: "assistance.triage",
    sidebarProps: {
      displayText: "Triajes",
      icon: <MonitorHeart />,
    },
  },
  {
    path: "/LaboratoryManagement",
    state: "laboratory",
    sidebarProps: {
      displayText: "Laboratorio",
      icon: <Vaccines />,
    },
  },
  {
    path: "/ConfigurationManagement",
    state: "configuration",
    sidebarProps: {
      displayText: "Configuracion",
      icon: <Settings />,
    },
  },
];

export default routesSideBar;
