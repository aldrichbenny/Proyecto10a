import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

//Paginas Administrador
import InicioADM from './pages/Administrador/InicioADM';
import MainAdmin from './pages/Administrador/MainAdmin';
import DashboardAdmin from './pages/Administrador/DashboardAdmin';
<<<<<<< Updated upstream
import DashboardADM from './pages/Administrador/DashboardADM';
=======
import ClienteADM from './pages/Administrador/ClienteADM';
import OrdenesADM from './pages/Administrador/OrdenesADM';
import SolicitudesADM from './pages/Administrador/SolicitudesADM';
import ProductosADM from './pages/Administrador/ProductosADM';
import ProfileADM from './pages/Administrador/ProfileADM';
import ProductoDetailADM from './pages/Administrador/ProductoDetailADM';
>>>>>>> Stashed changes

//Paginas Areas de trabajo
import PendAR from './pages/Area/PendAR';
import ProcAR from './pages/Area/ProcAR';
import HistAR from './pages/Area/HistAR';
<<<<<<< Updated upstream
=======
import HistDetailsAR from './pages/Area/HistDetailsAR';
import ProfileAR from './pages/Area/ProfileAR';
>>>>>>> Stashed changes

//Paginas Cliente
import InicioCL from './pages/Cliente/InicioCL';
import MainCliente from './pages/Cliente/MainCliente';
import Catalogo from './pages/Cliente/Catalogo';
import ProductoDetalle from './pages/Cliente/ProductoDetalle';
import Carrito from './components/Carrito';
<<<<<<< Updated upstream
=======
import MisPedidos from './pages/Cliente/MisPedidos';
import DetallePedido from './pages/Cliente/DetallePedido';
import Perfil from './pages/Cliente/Perfil';
import Wishlist from './pages/Cliente/Wishlist';
>>>>>>> Stashed changes

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
            <Route path="/indexADM" element={<InicioADM />} />
            <Route path="/admin" element={<MainAdmin />}>
              <Route index element={<DashboardAdmin />} />
              <Route path="clientes" element={<div>Clientes</div>} />
              <Route path="ordenes" element={<div>Ordenes</div>} />
              <Route path="solicitudes" element={<div>Solicitudes</div>} />
              <Route path="productos" element={<div>Productos</div>} />
            </Route>

            {/*Rutas Areas de trabajo*/}
            <Route path="/indexAR" element={<InicioAR />} />

            {/*Rutas Cliente*/}
            <Route path="/indexCL" element={<InicioCL />} />
            <Route path="/main" element={<MainCliente />} />
            <Route path="/catalogo/:categoria" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
<<<<<<< Updated upstream
=======
            <Route path="/mis-pedidos" element={<MisPedidos />} />
            <Route path="/detalle-pedido/:id" element={<DetallePedido />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/favoritos" element={<Wishlist />} />
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    </CartProvider>

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
