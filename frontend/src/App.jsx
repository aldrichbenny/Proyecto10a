import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Paginas Administrador
//import DashboardADM from './pages/Administrador/DashboardADM';//este no se usa
//import InicioADM from './pages/Administrador/InicioADM';
import MainAdmin from './pages/Administrador/MainAdmin';
import DashboardAdmin from './pages/Administrador/DashboardAdmin';

//Paginas Areas de trabajo
//import InicioAR from './pages/Area/InicioAR';//este no se uso
import PendAR from './pages/Area/PendAR';
import ProcAR from './pages/Area/ProcAR';
import HistAR from './pages/Area/HistAR';


//Paginas Cliente
//import InicioCL from './pages/Cliente/InicioCL';/// este no se uso
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
            {/*<Route path="/DashboardADM" element={<DashboardADM />} />*/}
            {/*<Route path="/indexADM" element={<InicioADM />} />*/}
            <Route path="/admin" element={<MainAdmin />}>
                <Route index element={<DashboardAdmin />} />
                <Route path="clientes" element={<div>Clientes</div>} />
                <Route path="ordenes" element={<div>Ordenes</div>} />
                <Route path="solicitudes" element={<div>Solicitudes</div>} />
                <Route path="productos" element={<div>Productos</div>} />
            </Route>
            {/*Rutas Areas de trabajo*/}
            <Route path="/indexAR" element={<PendAR />} />
            <Route path="/procesoAR" element={<ProcAR />} />
            <Route path="/historialAR" element={<HistAR />} />

            {/*Rutas Cliente*/}
            {/*<Route path="/indexCL" element={<InicioCL />} />*/}
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
