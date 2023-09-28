// External libraries
import React from 'react';
import { RouteType } from "./config";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

// Pages
import HomePage from "../pages/home/HomePage";
import PatientPage from "../pages/PatientManagement/PatientPage";
import StaffManagement from "../pages/StaffManagement/StaffManagement";
import StaffPage from "../pages/StaffManagement/StaffPage";
import AttentionLogPage from "../pages/StaffManagement/AttentionLogPage";
import DefaultStaffPage from "../pages/StaffManagement/DefaultStaffPage";
import SchedulePage from "../pages/StaffManagement/SchedulePage";
import MedicalAssistenceManagement from "../pages/MedicalAssistance/MedicalAssistenceManagement";
import TriagePage from "../pages/MedicalAssistance/TriagePage";
import NewAttentionPage from "../pages/MedicalAssistance/NewAttentionPage";
import LaboratoryPage from "../pages/LaboratoryManagement/LaboratoryPage";
import ConfigurationPage from "../pages/ConfigurationManagement/ConfigurationPage";
import Appointments from '../pages/MedicalAssistance/AppointmentsPage';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/patient",
    element: <PatientPage />,
    state: "patient",
    sidebarProps: {
      displayText: "Pacientes",
      icon: <FileDownloadOutlinedIcon />
    }
  },
  {
    path: "/staff",
    element: <StaffManagement />,
    state: "staff",
    sidebarProps: {
      displayText: "Personal Medico",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <AttentionLogPage />,
        state: "staff.index"
      },
      {
        path: "/staff/default",
        element: <DefaultStaffPage />,
        state: "staff.default",
        sidebarProps: {
          displayText: "Nuevo Personal Medico"
        },
      },
      {
        path: "/staff/MedicProfile",
        element: <StaffPage />,
        state: "staff.main",
        sidebarProps: {
          displayText: "Ver Doctores Disponibles"
        }
      },
      {
        path: "/staff/schedules",
        element: <SchedulePage />,
        state: "staff.schedules",
        sidebarProps: {
          displayText: "Turnos y Horarios"
        }
      },
      {
        path: "/staff/attentions",
        element: <AttentionLogPage />,
        state: "staff.attentions",
        sidebarProps: {
          displayText: "Historial de Atenciones"
        }
      }
    ]
  },
  {
    path: "/assistance",
    element: <MedicalAssistenceManagement />,
    state: "assistance",
    sidebarProps: {
      displayText: "Asistencia Medica",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/assistance/new",
        element: <NewAttentionPage />,
        state: "assistance.new",
        sidebarProps: {
          displayText: "Nueva Atencion"
        }
      },
      {
        path: "/assistance/triage",
        element: <TriagePage />,
        state: "assistance.triage",
        sidebarProps: {
          displayText: "Triaje"
        },
      },
      {
        path: "/assistance/appointments",
        element: <Appointments />,
        state: "assistance.appointments",
        sidebarProps: {
          displayText: "Citas Programadas"
        }
      }
    ]
  },
  {
    path: "/laboratory",
    element: <LaboratoryPage />,
    state: "laboratory",
    sidebarProps: {
      displayText: "Laboratorio",
      icon: <ArticleOutlinedIcon />
    }
  },
  {
    path: "/configuration",
    element: <ConfigurationPage />,
    state: "configuration",
    sidebarProps: {
      displayText: "Configuracion",
      icon: <FormatListBulletedOutlinedIcon />
    }
  }
];

export default appRoutes;