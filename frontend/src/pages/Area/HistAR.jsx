import React from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { FileEarmarkFill } from 'react-bootstrap-icons';
import '../../css/app.css'
import TableHistorialAR from '../../components/Area/TableHistorialAR';

const HistAR = () => {
    return(
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
                                <div className='Symbol'> <FileEarmarkFill size={40} /> </div>
                                <div className='Title'>Historial</div>

                                {/* Se deja sin usar el boton de back para usarlo en detalles */}
                                <button className='back-button' saria-label="Volver atrás"></button>
                            </div>
                            <div className="container2">
                                <TableHistorialAR/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistAR;