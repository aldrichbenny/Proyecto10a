import React from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { ClockFill, ArrowLeftCircle} from 'react-bootstrap-icons';
import '../../css/app.css'
import TablePendienteAR from '../../components/Area/TablePendienteAR';

const PendAR = () => {
    return (
        <>
            <div className="app">
                <div className="navbar">
                    <NavbarAR />
                </div>
                <div className="main-content">
                    <div className="sidebar">
                        <SidebarAR />
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="title-container">
                                <div className='Symbol'> <ClockFill size={40} /> </div>
                                <div className='Title'>Pendientes</div>

                                {/* Se deja sin usar el boton de back para usarlo en detalles */}
                                <button className='back-button' saria-label="Volver atrás"></button>
                            </div>
                            <div className="container2">
                                <TablePendienteAR/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PendAR;