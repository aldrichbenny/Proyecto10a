import React, { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import '../../css/app.css';
import '../../css/Profile.css';
import axios from 'axios';

const ProfileADM = () => {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    console.error("No se encontró 'user' en el localStorage");
                    return;
                }

                const user = JSON.parse(storedUser);
                const idUsuario = user.id_usuario;

                const response = await axios.get('http://127.0.0.1:8000/api/Perfil/');
                const perfilData = response.data;

                if (!Array.isArray(perfilData)) {
                    console.error("La respuesta de la API no es un array");
                    return;
                }

                const perfilUsuario = perfilData.find(p => p.id_usuario === idUsuario);                
                if (perfilUsuario) {
                    setPerfil(perfilUsuario);
                } else {
                    console.error("No se encontró un perfil con el id_usuario correspondiente");
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="app">
            <div className="main-content">
                <div className="content">
                    <div className="container">
                        <div className="title-container">
                            <div className='Symbol'><PersonCircle size={40} /></div>
                            <div className='Title'>Perfil</div>
                            <button className='back-button' aria-label="Volver atrás"></button>
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

export default ProfileADM;
