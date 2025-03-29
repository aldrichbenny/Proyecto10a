import React from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { PersonCircle } from 'react-bootstrap-icons';
import '../../css/app.css'
import '../../css/Profile.css'

const ProfileAR = () => {
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
                            <div className='Symbol'> <PersonCircle size={40} /> </div>
                            <div className='Title'>Profile</div>

                            {/* Se deja sin usar el boton de back para usarlo en detalles */}
                            <button className='back-button' saria-label="Volver atrás"></button>
                            
                        </div>
                        <div className="container2">
                            <div className="profile-section">
                                <div className="profile-row">
                                    <span className="label">Nombre:</span>
                                    <span className="value">Juan Antonio Soliz</span>
                                </div>
                                <div className="profile-row">
                                    <span className="label">Teléfono:</span>
                                    <span className="value">664-361-2422</span>
                                </div>
                                <div className="profile-row">
                                    <span className="label">Dirección:</span>
                                    <span className="value">Carretera Libre Tijuana-Tecate Km 10 Fracc. El Refugio, Quintas Campestre, 22253 Redondo, B.C.</span>
                                </div>
                                <div className="profile-row">
                                    <span className="label">Correo:</span>
                                    <span className="value">0321101323@ut-tijuana.edu.mx</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfileAR;