import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Paginas Administrador
import DashboardADM from './pages/Administrador/DashboardADM';


//Paginas Areas de trabajo
import PendAR from './pages/Area/PendAR';
import ProcAR from './pages/Area/ProcAR';
import HistAR from './pages/Area/HistAR';


//Paginas Cliente
import InicioCL from './pages/Cliente/InicioCL';


import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Rutas administrador*/}
          <Route path="/DashboardADM" element={<DashboardADM />} />

          {/*Rutas Areas de trabajo*/}
          <Route path="/indexAR" element={<PendAR />} />
          <Route path="/procesoAR" element={<ProcAR />} />
          <Route path="/historialAR" element={<HistAR />} />

          {/*Rutas Cliente*/}
          <Route path="/indexCL" element={<InicioCL />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
