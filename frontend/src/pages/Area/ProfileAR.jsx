import React, { useEffect, useState } from "react";
import { obtenerPerfil } from "../../api/perfilar"; 
import NavbarAR from "../../components/Area/NavbarAR";
import SidebarAR from "../../components/Area/SidebarAR";
import { PersonCircle } from "react-bootstrap-icons";
import "../../css/app.css";
import "../../css/Profile.css";

const ProfileAR = () => {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const cargarPerfil = async () => {
            const perfilData = await obtenerPerfil();
            if (perfilData) {
                setPerfil(perfilData);
            }
        };

        cargarPerfil();
    }, []);

    return (
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
                            <div className="Symbol"> <PersonCircle size={40} /> </div>
                            <div className="Title">Profile</div>
                        </div>
                        <div className="container2">
                            {perfil ? (
                                <div className="profile-section">
                                    <div className="profile-row">
                                        <span className="label">Nombre:</span>
                                        <span className="value">{perfil.nombre} {perfil.apellido_pat} {perfil.apellido_mat}</span>
                                    </div>
                                    <div className="profile-row">
                                        <span className="label">Teléfono:</span>
                                        <span className="value">{perfil.telefono}</span>
                                    </div>
                                    <div className="profile-row">
                                        <span className="label">Dirección:</span>
                                        <span className="value">{perfil.direccion}</span>
                                    </div>
                                    <div className="profile-row">
                                        <span className="label">Correo:</span>
                                        <span className="value">{perfil.detalle_id_usuario.correo}</span>
                                    </div>
                                </div>
                            ) : (
                                <p>Cargando perfil...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAR;
