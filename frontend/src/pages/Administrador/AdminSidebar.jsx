import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ toggleSidebar }) => {
  return (
    <div className="bg-[#333333] h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-white block">
          <span className="material-icons">menu</span>
        </button>
      </div>
      
      <div className="py-4">
        <Link to="/admin" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">dashboard</span>
          <span>Dashboard</span>
        </Link>
        
        <Link to="/admin/clientes" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">people</span>
          <span>Clientes</span>
        </Link>

        <Link to="/admin/ordenes" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">receipt</span>
          <span>Ordenes</span>
        </Link>

        <Link to="/admin/solicitudes" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">assignment</span>
          <span>Solicitudes</span>
        </Link>

        <Link to="/admin/productos" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">inventory_2</span>
          <span>Productos</span>
        </Link>
      </div>

      <div className="mt-auto border-t border-gray-700">
        <Link to="/" className="flex items-center text-white py-3 px-4 hover:bg-gray-700">
          <span className="material-icons mr-3">logout</span>
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
