import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {es} from "date-fns/locale"

function App() {
  return (
    <div className= "App">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
