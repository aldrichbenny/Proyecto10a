import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clipboard2DataFill, PeopleFill, InboxesFill, FileEarmarkRuledFill, CollectionFill } from 'react-bootstrap-icons';
import '../css/main.css';
import '../css/Sidebar.css';

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/dashboard') setActiveTab('Dashboard');
    if (location.pathname === '/admin/clientes') setActiveTab('Clientes');
    if (location.pathname === '/admin/ordenes') setActiveTab('Ordenes');
    if (location.pathname === '/admin/solicitudes') setActiveTab('Solicitudes');
    if (location.pathname === '/admin/productos') setActiveTab('Productos');
  }, [location.pathname]);

  const handleNavigate = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="sidebar-ar bg-light">
      <ul className="nav nav-pills flex-column mt-5">
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/admin', 'Dashboard')}
            className={`nav-link ${activeTab === 'Dashboard' ? 'active' : 'text-dark'}`}
          >
            <Clipboard2DataFill size={20} className="ms-1 me-2" />
            Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/admin/clientes', 'Clientes')}
            className={`nav-link ${activeTab === 'Clientes' ? 'active' : 'text-dark'}`}
          >
            <PeopleFill size={20} className="ms-1 me-2" />
            Clientes
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/admin/ordenes', 'Ordenes')}
            className={`nav-link ${activeTab === 'Ordenes' ? 'active' : 'text-dark'}`}
          >
            <InboxesFill size={20} className="ms-1 me-2" />
            Ordenes
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/admin/solicitudes', 'Solicitudes')}
            className={`nav-link ${activeTab === 'Solicitudes' ? 'active' : 'text-dark'}`}
          >
            <FileEarmarkRuledFill size={20} className="ms-1 me-2" />
            Solicitudes
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/admin/productos', 'Productos')}
            className={`nav-link ${activeTab === 'Productos' ? 'active' : 'text-dark'}`}
          >
            <CollectionFill size={20} className="ms-1 me-2" />
            Productos
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;