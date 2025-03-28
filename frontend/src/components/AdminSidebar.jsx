import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <Link to="/admin" className="flex items-center space-x-2 mb-8">
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </Link>
        
        <Link to="/admin/clientes" className="flex items-center space-x-2 mb-4">
          <i className="fas fa-users"></i>
          <span>Clientes</span>
        </Link>

        <Link to="/admin/ordenes" className="flex items-center space-x-2 mb-4">
          <i className="fas fa-file-alt"></i>
          <span>Ordenes</span>
        </Link>

        <Link to="/admin/solicitudes" className="flex items-center space-x-2 mb-4">
          <i className="fas fa-clipboard-list"></i>
          <span>Solicitudes</span>
        </Link>

        <Link to="/admin/productos" className="flex items-center space-x-2 mb-4">
          <i className="fas fa-tshirt"></i>
          <span>Productos</span>
        </Link>
      </div>

      <div className="mt-auto">
        <Link to="/" className="flex items-center space-x-2">
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
