import React, { useState } from 'react';
import NavbarAR from '../../components/Area/NavbarAR';
import SidebarAR from '../../components/Area/SidebarAR';
import { InfoCircleFill, ArrowLeftCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/DetailsAR.css';

const HistDetailsAR = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/historialAR');
    };

    const order = {
        id: 12345,
        date: '2024-03-04',
        time: '14:30',
        customer: {
          name: 'Juan Perez',
          phone: '664-456-4321',
          email: 'juan@ropas.mx',
        },
        deliveryAddress: 'Calle 13, Ciudad XYZ',
        products: [
          { name: 'Camisa', brand: 'Luis Vouiton', size: 'XL', color: 'Negro', price: 1000 },
          { name: 'Pantalón', brand: 'Luis Vouiton', size: 'XL', color: 'Negro', price: 1000 },
          { name: 'Camisa', brand: 'Luis Vouiton', size: 'L', color: 'Negro', price: 1000 },
          { name: 'Pantalón', brand: 'Luis Vouiton', size: 'L', color: 'Negro', price: 1000 }
        ]
    };

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
                            <div className='Title'>Informacion de Orden *Numero de orden*</div>
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
                                            <span className="order-info-label">ID Orden:</span>
                                            <span className="order-info-value">#{order.id}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Fecha Registro:</span>
                                            <span className="order-info-value">{order.date}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Hora Registro:</span>
                                            <span className="order-info-value">{order.time}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Nombre:</span>
                                            <span className="order-info-value">{order.customer.name}</span>
                                        </div>
                                    </div>
                                    <div className="order-info-row">
                                        <div className="order-info-item">
                                            <span className="order-info-label">Teléfono:</span>
                                            <span className="order-info-value">{order.customer.phone}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Correo:</span>
                                            <span className="order-info-value">{order.customer.email}</span>
                                        </div>
                                        <div className="order-info-item">
                                            <span className="order-info-label">Dirección:</span>
                                            <span className="order-info-value">{order.deliveryAddress}</span>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="products-title">Productos</h2>
                                <table className="pend-details-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Marca</th>
                                            <th>Talla</th>
                                            <th>Color</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.size}</td>
                                                <td>{product.color}</td>
                                                <td>${product.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistDetailsAR;