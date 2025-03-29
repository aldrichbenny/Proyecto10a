import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Paginas Administrador
import MainAdmin from './pages/Administrador/MainAdmin';
import DashboardAdmin from './pages/Administrador/DashboardAdmin';

//Paginas Areas de trabajo
import PendAR from './pages/Area/PendAR';
import PendDetailsAR from './pages/Area/PendDetailsAR';
import ProcAR from './pages/Area/ProcAR';
import ProcDetailsAR from './pages/Area/ProcDetailsAR';
import HistAR from './pages/Area/HistAR';
import HistDetailsAR from './pages/Area/HistDetailsAR';
import ProfileAR from './pages/Area/ProfileAR';


//Paginas Cliente
import MainCliente from './pages/Cliente/MainCliente';
import Catalogo from './pages/Cliente/Catalogo';
import ProductoDetalle from './pages/Cliente/ProductoDetalle';
import Carrito from './components/Carrito';

import Login from './pages/Login';
import Register from './pages/Register';

import { CartProvider } from './context/CartContext';


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/*Rutas administrador*/}
            <Route path="/admin" element={<MainAdmin />}>
                <Route index element={<DashboardAdmin />} />
                <Route path="clientes" element={<div>Clientes</div>} />
                <Route path="ordenes" element={<div>Ordenes</div>} />
                <Route path="solicitudes" element={<div>Solicitudes</div>} />
                <Route path="productos" element={<div>Productos</div>} />
            </Route>
            {/*Rutas Areas de trabajo*/}
            <Route path="/indexAR" element={<PendAR />} />
            <Route path="/pendienteDetailsAR" element={<PendDetailsAR />} />
            <Route path="/procesoAR" element={<ProcAR />} />
            <Route path="/procesoDetailsAR" element={<ProcDetailsAR />} />
            <Route path="/historialAR" element={<HistAR />} />
            <Route path="/historialDetailsAR" element={<HistDetailsAR />} />
            <Route path="/profileAR" element={<ProfileAR />} />

            {/*Rutas Cliente*/}
            <Route path="/main" element={<MainCliente />} />
            <Route path="/catalogo/:categoria" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
