import React, { useState, useEffect } from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { InfoCircleFill, ArrowLeftCircle } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../../css/DetailsAR.css';

const HistDetailsAR = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtener la ubicación actual
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(null);
    const [pedidoDetails, setPedidoDetails] = useState(null);
    const { clienteId, orderId, fechaR, horaR } = location.state || {}; 
    const [colores, setColores] = useState([]);
    const [colorNombre, setColorNombre] = useState("");
    const [tallaID, setTallaID] = useState(0); 

    const handleBackClick = () => {
        navigate('/historialAR');
    };


    useEffect(() => {
        if (clienteId) {
            // Solicitar perfil basado en clienteId
            axios.get('http://127.0.0.1:8000/api/Perfil/')
                .then(response => {
                    const perfilCliente = response.data.find(perfil => perfil.id_usuario === clienteId);
                    setPerfil(perfilCliente);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching perfil data:', error);
                    setLoading(false);
                });
        }
    }, [clienteId]);

    useEffect(() => {
        if (orderId) {
            axios.get(`http://127.0.0.1:8000/api/Pedido/${orderId}`)
                .then(response => {                        
                    setPedidoDetails(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching pedido details:', error);
                    setLoading(false);
                });
        }
    }, [orderId]);

    useEffect(() => {
        if (pedidoDetails) {
            setTallaID(pedidoDetails?.detalle_id_solicitud_producto?.detalle_id_talla?.id_talla || 0);
        }
    }, [pedidoDetails]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/Colores_talla/")
            .then(response => {
                setColores(response.data);
            })
            .catch(error => {
                console.error("Error fetching colores:", error);
            });
    }, []);
    
    useEffect(() => {
        if (tallaID && colores.length > 0) {
            const colorEncontrado = colores.find(color => color.id_talla === tallaID);
            if (colorEncontrado) {
                setColorNombre(colorEncontrado.detalle_id_color.nombre_color);
            }
        }
    }, [tallaID, colores]);


    if (loading) {
        return <div>Loading...</div>;
    }

    const producto = pedidoDetails?.detalle_id_solicitud_producto?.detalle_id_talla?.detalle_id_producto?.nombre_producto || '';
    const cantidad = pedidoDetails?.cantidad_total || 0;
    const talla = pedidoDetails?.detalle_id_solicitud_producto?.detalle_id_talla?.nombre_talla || '';
    const precio = (parseFloat(pedidoDetails?.detalle_id_solicitud_producto?.detalle_id_talla?.detalle_id_producto?.precio_producto) || 0) * pedidoDetails?.cantidad_total || 0;
    const horaFormateada = horaR ? horaR.split('.')[0] : '';

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
                            <div className='Symbol'> 
                                <InfoCircleFill size={40} /> 
                            </div>
                            <div className='Title'>Detalles del pedido en proceso</div>
                            <button 
                                className='back-button' 
                                onClick={handleBackClick}
                                aria-label="Volver atrás"
                            >
                                <ArrowLeftCircle size={40} />
                            </button>
                        </div>
                        {perfil ? (
                        <div className="container2">
                            <div className="order-details-container">
                                <div className="order-info-grid">
                                    <div className="order-info-row">
                                        <div className="order-info-item">
                                            <span className="order-info-label">ID Order:</span>
                                            <span className="order-info-value">{orderId}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Fecha Registro:</span>
                                            <span className="order-info-value">{fechaR}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Hora Registro:</span>
                                            <span className="order-info-value">{horaFormateada}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Nombre:</span>
                                            <span className="order-info-value">{perfil.nombre} {perfil.apellido_pat} {perfil.apellido_mat}</span>
                                        </div>
                                    </div>
                                    <div className="order-info-row">
                                        <div className="order-info-item">
                                            <span className="order-info-label">Teléfono:</span>
                                            <span className="order-info-value">{perfil.telefono}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Correo:</span>
                                            <span className="order-info-value">{perfil.detalle_id_usuario.correo}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Dirección:</span>
                                            <span className="order-info-value">{perfil.direccion}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <h2 className="products-title">Producto</h2>
                                <table className="pend-details-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Talla</th>
                                            <th>Color</th>
                                            <th>Precio Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr>
                                                <td>{producto}</td>
                                                <td>{cantidad}</td>
                                                <td>{talla}</td>
                                                <td>{colorNombre }</td>
                                                <td>{precio}</td>
                                            </tr>
                                    </tbody>
                                </table>

                        </div>
                        ) : (
                            <div>No se encontró el perfil del cliente.</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistDetailsAR;
