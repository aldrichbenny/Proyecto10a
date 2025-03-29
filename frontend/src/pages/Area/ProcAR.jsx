import React from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { ArrowClockwise } from 'react-bootstrap-icons';
import TableProcesoAR from '../../components/Area/TableProcesoAR';
import '../../css/app.css'

const ProcAR = () => {
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
                                <div className='Symbol'> <ArrowClockwise size={40} /> </div>
                                <div className='Title'>En proceso</div>

                                {/* Se deja sin usar el boton de back para usarlo en detalles */}
                                <button className='back-button' saria-label="Volver atrás"></button>
                            </div>
                            <div className="container2">
                                <TableProcesoAR/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcAR;