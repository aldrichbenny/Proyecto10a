import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, ArrowClockwise, FileEarmark, BoxArrowRight, ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons';
import '../css/main.css'
import '../css/Sidebar.css';

const SidebarAR = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('sidebarOpen') === 'false' ? false : true;
  });
  const [activeTab, setActiveTab] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebarOpen', isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname === '/indexAR') setActiveTab('Pendientes');
    if (location.pathname === '/procesoAR') setActiveTab('En proceso');
    if (location.pathname === '/historialAR') setActiveTab('Historial');
  }, [location.pathname]);

  const handleNavigate = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className={`d-flex flex-column p-3 bg-light sidebar ${isOpen ? 'open' : 'closed'}`}>
      <ul className="nav nav-pills flex-column mt-5">
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/indexAR', 'Pendientes')}
            className={`nav-link ${activeTab === 'Pendientes' ? 'active' : 'text-dark'}`}
          >
            <Clock size={20} className="ms-2 me-2" />
            {isOpen && 'Pendientes'}
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/procesoAR', 'En proceso')}
            className={`nav-link ${activeTab === 'En proceso' ? 'active' : 'text-dark'}`}
          >
            <ArrowClockwise size={20} className="ms-2 me-2" />
            {isOpen && 'En proceso'}
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            onClick={() => handleNavigate('/historialAR', 'Historial')}
            className={`nav-link ${activeTab === 'Historial' ? 'active' : 'text-dark'}`}
          >
            <FileEarmark size={20} className="ms-2 me-2" />
            {isOpen && 'Historial'}
          </button>
        </li>
      </ul>

      <button 
        className="toggle-btn" 
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {isOpen ? <ChevronDoubleLeft size={20} /> : <ChevronDoubleRight size={20} />}
      </button>
    </div>
  );
};

export default SidebarAR;