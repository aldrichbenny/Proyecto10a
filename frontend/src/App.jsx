import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Paginas Administrador
import InicioADM from './pages/Administrador/InicioADM';


//Paginas Areas de trabajo
import InicioAR from './pages/Area/InicioAR';


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
          <Route path="/indexADM" element={<InicioADM />} />

          {/*Rutas Areas de trabajo*/}
          <Route path="/indexAR" element={<InicioAR />} />

          {/*Rutas Cliente*/}
          <Route path="/indexCL" element={<InicioCL />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
