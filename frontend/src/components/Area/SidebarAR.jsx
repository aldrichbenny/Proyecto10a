import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, ArrowClockwise, FileEarmark } from 'react-bootstrap-icons';
import '../../css/main.css'
import '../../css/Sidebar.css';

const SidebarAR = () => {
  const [activeTab, setActiveTab] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/indexAR' || location.pathname === '/pendienteDetailsAR') setActiveTab('Pendientes');
    if (location.pathname === '/procesoAR' || location.pathname === '/procesoDetailsAR') setActiveTab('En proceso');
    if (location.pathname === '/historialAR' || location.pathname === '/historialDetailsAR') setActiveTab('Historial');
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
            onClick={() => handleNavigate('/indexAR', 'Pendientes')}
            className={`nav-link ${activeTab === 'Pendientes' ? 'active' : 'text-dark'}`}
          >
            <Clock size={20} className="ms-1 me-2" />
            Pendientes
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/procesoAR', 'En proceso')}
            className={`nav-link ${activeTab === 'En proceso' ? 'active' : 'text-dark'}`}
          >
            <ArrowClockwise size={20} className="ms-1 me-2" />
            En proceso
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/historialAR', 'Historial')}
            className={`nav-link ${activeTab === 'Historial' ? 'active' : 'text-dark'}`}
          >
            <FileEarmark size={20} className="ms-1 me-2" />
            Historial
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAR;