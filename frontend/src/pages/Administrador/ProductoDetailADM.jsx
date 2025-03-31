import React, { useState } from 'react';
import { InfoCircleFill, ArrowLeftCircle } from 'react-bootstrap-icons';
import { Button, Form, Col, Card, Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/DetailsAR.css';

const ProductoDetailADM = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [order, setOrder] = useState({
        id: 12345,
        nombre: '2024-03-04',
        cantidadStock: '14:30',
        talla: 'L',
        fechaRegistro: '2024-03-04',
        descripcion: 'Camiseta Luis vuiton directa de Paris mama mia',
        products: [
            { descripcion: 'Ingreso', cantidad: '1000', fecha: '2024-03-04' },
            { descripcion: 'Ingreso', cantidad: '1000', fecha: '2024-03-04' },
            { descripcion: 'Egreso', cantidad: '1000', fecha: '2024-03-04' },
            { descripcion: 'Egreso', cantidad: '1000', fecha: '2024-03-04' }
        ]
    });

    const handleBackClick = () => {
        navigate('/admin/productos');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        console.log('Datos guardados:', order);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
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
                <div className="details-wrapper">
                    <div id="order-details-container">
                        <form className="order-info-grid">
                            <div className="order-info-row">
                                <div className="order-info-item">
                                    <span className="order-info-label">ID: </span>
                                    {isEditing ? (
                                        <Form.Control
                                        type="text"
                                        name="id"
                                        value={order.id}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                ) : (
                                    <Form.Control plaintext readOnly defaultValue={`#${order.id}`} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Nombre:</span>
                                    {isEditing ? (
                                        <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={order.nombre}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Form.Control plaintext readOnly defaultValue={order.nombre} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Cantidad:</span>
                                    {isEditing ? (
                                        <Form.Control
                                        type="text"
                                        name="cantidadStock"
                                        value={order.cantidadStock}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Form.Control plaintext readOnly defaultValue={order.cantidadStock} />
                                    )}
                                </div>
                            </div>
                            <div className="order-info-row">
                                <div className="order-info-item">
                                    <span className="order-info-label">Talla:</span>
                                    {isEditing ? (
                                        <Form.Select
                                        name="talla"
                                        value={order.talla}
                                        onChange={handleInputChange}
                                    >
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </Form.Select>
                                ) : (
                                    <Form.Control plaintext readOnly defaultValue={order.talla} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Fecha de registro:</span>
                                    {isEditing ? (
                                         <Form.Control
                                         type="date"
                                         name="fechaRegistro"
                                         value={order.fechaRegistro}
                                         onChange={handleInputChange}
                                     />
                                 ) : (
                                     <Form.Control plaintext readOnly defaultValue={order.fechaRegistro} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Descripcion:</span>
                                    {isEditing ? (
                                        <Form.Control
                                        as="textarea"
                                        name="descripcion"
                                        value={order.descripcion}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                ) : (
                                    <Form.Control plaintext readOnly defaultValue={order.descripcion} />
                                    )}
                                </div>
                            </div>
                        </form>

                        <h2 className="products-title">Historial de Stock</h2>
                        <table className="pend-details-table">
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Cantidad</th>
                                    <th>Fecha y hora de modificación</th>
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

                        <div className="d-flex gap-2 mt-4">
                            {!isEditing ? (
                                <Button variant="primary" onClick={handleEditClick}>
                                    Editar Producto
                                </Button>
                            ) : (
                                <>
                                    <Button variant="success" onClick={handleSaveClick}>
                                        Guardar Cambios
                                    </Button>
                                    <Button variant="danger" onClick={handleCancelClick}>
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <Col md={4}>
                        <Card className="image-ropa-container">
                            <Card.Body className='text-center'>
                                <Image src="https://placehold.co/300x450" alt="Imagen del producto" fluid  rounded/>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetailADM;