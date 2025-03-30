import React, { useState } from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { InfoCircleFill, ArrowLeftCircle, ExclamationCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import '../../css/DetailsAR.css';

const ProductoDetailADM = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/productos');
    };

    const order = {
        id: 12345,
        nombre: '2024-03-04',
        cantidadStock: '14:30',
        talla:'L',
        fechaRegistro: '2024-03-04',
        descripcion: 'Camiseta Luis vuiton directa de Paris mama mia',
        products: [
          { descripcion: 'Ingreso', cantidad: '1000', fecha: '2024-03-04' },
          { descripcion: 'Ingreso', cantidad: '1000', fecha: '2024-03-04' },
          { descripcion: 'Egreso', cantidad: '1000', fecha: '2024-03-04' },
          { descripcion: 'Egreso', cantidad: '1000', fecha: '2024-03-04' }
        ]
    };

    return (
            <div className="container">
                <div className="title-container">
                    <div className='Symbol'> 
                        <InfoCircleFill size={40} /> 
                    </div>
                    <div className='Title'>Detalles del producto</div>
                    <button 
                        className='back-button' 
                        onClick={handleBackClick}
                        aria-label="Volver atrás"
                    >
                        <ArrowLeftCircle size={40} />
                    </button>
                </div>
                <div className="container2">
                    <div className="order-details-container">
                        <div className="order-info-grid">
                            <div className="order-info-row">
                                <div className="order-info-item">
                                    <span className="order-info-label">ID: </span>
                                    <span className="order-info-value">#{order.id}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Nombre:</span>
                                    <span className="order-info-value">{order.nombre}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Cantidad:</span>
                                    <span className="order-info-value">{order.cantidadStock}</span>
                                </div>
                            </div>
                            <div className="order-info-row">
                                <div className="order-info-item">
                                    <span className="order-info-label">Talla:</span>
                                    <span className="order-info-value">{order.talla}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Fecha de registro:</span>
                                    <span className="order-info-value">{order.fechaRegistro}</span>
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Descripcion:</span>
                                    <span className="order-info-value">{order.descripcion}</span>
                                </div>
                            </div>
                        </div>

                        <h2 className="products-title">Historial de Stock</h2>
                        <table className="pend-details-table">
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Cantidad</th>
                                    <th>Fecha y hora de modoficacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.descripcion}</td>
                                        <td>{product.cantidad}</td>
                                        <td>{product.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default ProductoDetailADM;