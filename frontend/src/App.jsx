import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Paginas Administrador
import MainAdmin from './pages/Administrador/MainAdmin';
import DashboardAdmin from './pages/Administrador/DashboardAdmin';
import Solicitudes from './pages/Administrador/Solicitudes';
import Ordenes from './pages/Administrador/Ordenes';
import DetalleOrden from './pages/Administrador/DetalleOrden';
import DetalleSolicitud from './pages/Administrador/DetalleSolicitud';
//Paginas Areas de trabajo
import PendAR from './pages/Area/PendAR';
import PendDetailsAR from './pages/Area/PendDetailsAR';
import ProcAR from './pages/Area/ProcAR';
import ProcDetailsAR from './pages/Area/ProcDetailsAR';
import HistAR from './pages/Area/HistAR';
import HistDetailsAR from './pages/Area/HistDetailsAR';
import ProfileAR from './pages/Area/ProfileAR';
import ProductoDetailADM from './pages/Administrador/ProductoDetailADM';



//Paginas Cliente
import MainCliente from './pages/Cliente/MainCliente';
import Catalogo from './pages/Cliente/Catalogo';
import ProductoDetalle from './pages/Cliente/ProductoDetalle';
import Carrito from './components/Carrito';
import MisPedidos from './pages/Cliente/MisPedidos';
import DetallePedido from './pages/Cliente/DetallePedido';

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
            <Route path="ordenes" element={<Ordenes />} />
            <Route path="orden/:id" element={<DetalleOrden />} />
            <Route path="solicitudes" element={<Solicitudes />} />
            <Route path="solicitud/:id" element={<DetalleSolicitud />} />
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
