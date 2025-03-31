import React, { useState, useEffect } from 'react';
import { InfoCircleFill, ArrowLeftCircle } from 'react-bootstrap-icons';
import { Button, Form, Col, Card, Image, Carousel } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/DetailsAR.css';

const ProductoDetailADM = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const { productoId, tallaid } = location.state || {};
    const [tallaDetails, setTallaDetails] = useState({
        id_talla: '',
        nombre_talla: '',
        cantidad: '',
        detalle_id_producto: {
            nombre_producto: '',
            descripcion_producto: ''
        }
    });
    const [imagenes, setImagenes] = useState([]);
    const [historialStock, setHistorialStock] = useState([]);

    // Fetch talla details
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Imagen/`);
                const filteredImages = response.data.filter(img => img.id_producto === productoId);
                setImagenes(filteredImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        const fetchTallaDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Talla/${tallaid}`);
                setTallaDetails(response.data);
            } catch (error) {
                console.error("Error fetching talla details:", error);
            }
        };

        const fetchHistorialStock = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Historial_stock/`);
                const filteredHistorial = response.data.filter(item => item.id_talla === tallaid);
                setHistorialStock(filteredHistorial);
            } catch (error) {
                console.error("Error fetching historial stock:", error);
            }
        };

        fetchImages();
        fetchTallaDetails();
        fetchHistorialStock();
    }, [productoId, tallaid]);

    const handleBackClick = () => {
        navigate('/admin/productos');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        axios.get(`http://127.0.0.1:8000/api/Talla/${tallaid}/`)
            .then(response => {
                const currentTallaData = response.data;
    
                axios.put(`http://127.0.0.1:8000/api/Talla/${tallaid}/`, {
                    id_talla: currentTallaData.id_talla, 
                    nombre_talla: currentTallaData.nombre_talla,
                    cantidad: tallaDetails.cantidad || currentTallaData.cantidad,  
                    id_producto: currentTallaData.id_producto,
                })
                .then(() => {
                    axios.get(`http://127.0.0.1:8000/api/Productos/${productoId}`)
                        .then(productoResponse => {
                            const currentProductoData = productoResponse.data;
    
                            axios.put(`http://127.0.0.1:8000/api/Productos/${productoId}/`, {
                                id_producto: currentProductoData.id_producto,
                                nombre_producto: tallaDetails?.detalle_id_producto?.nombre_producto || currentProductoData.nombre_producto, 
                                descripcion_producto: tallaDetails?.detalle_id_producto?.descripcion_producto || currentProductoData.descripcion_producto,
                                precio_producto: currentProductoData.precio_producto,
                                id_categoria: currentProductoData.id_categoria,
                            })
                            .then(() => {
                                console.log('Datos de talla y producto actualizados correctamente.');
                                window.location.reload();
                            })
                            .catch(error => {
                                console.error('Error al actualizar los datos del producto:', error);
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener los datos del producto:', error);
                        });
                })
                .catch(error => {
                    console.error('Error al actualizar los datos de talla:', error);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos de talla:', error);
            });
    };
    

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre_producto' || name === 'descripcion_producto') {
            setTallaDetails(prev => ({
                ...prev,
                detalle_id_producto: {
                    ...prev.detalle_id_producto,
                    [name]: value,
                }
            }));
        } else {
            setTallaDetails(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const formatFechaHora = (fecha, hora) => {
        const fechaHora = `${fecha}T${hora}`; 
        const date = new Date(fechaHora); 

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        return date.toLocaleString('es-ES', options);
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
                                            name="id_talla"
                                            value={tallaDetails?.id_talla || ''}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    ) : (
                                        <Form.Control plaintext readOnly value={tallaDetails?.id_talla || ''} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Nombre:</span>
                                    {isEditing ? (
                                        <Form.Control
                                            type="text"
                                            name="nombre_producto"
                                            value={tallaDetails?.detalle_id_producto?.nombre_producto || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <Form.Control plaintext readOnly value={tallaDetails?.detalle_id_producto?.nombre_producto || ''} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Cantidad:</span>
                                    {isEditing ? (
                                        <Form.Control
                                            type="text"
                                            name="cantidad"
                                            value={tallaDetails?.cantidad || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <Form.Control plaintext readOnly value={tallaDetails?.cantidad || ''} />
                                    )}
                                </div>
                            </div>
                            <div className="order-info-row">
                                <div className="order-info-item">
                                    <span className="order-info-label">Talla:</span>
                                    {isEditing ? (
                                        <Form.Control
                                            name="talla"
                                            value={tallaDetails?.nombre_talla || ''}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    ) : (
                                        <Form.Control plaintext readOnly value={tallaDetails?.nombre_talla || ''} />
                                    )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Fecha de registro:</span>
                                    {isEditing ? (
                                         <Form.Control
                                             type="date"
                                             name="fechaRegistro"
                                             value={historialStock?.[0]?.fecha_historial_stock || ''}
                                             onChange={handleInputChange}
                                             disabled
                                         />
                                     ) : (
                                         <Form.Control plaintext readOnly value={historialStock?.[0]?.fecha_historial_stock || ''} />
                                     )}
                                </div>
                                <div className="order-info-item">
                                    <span className="order-info-label">Descripcion:</span>
                                    {isEditing ? (
                                        <Form.Control
                                            as="textarea"
                                            name="descripcion_producto"
                                            value={tallaDetails?.detalle_id_producto?.descripcion_producto || ''}
                                            onChange={handleInputChange}
                                            rows={3}
                                        />
                                    ) : (
                                        <Form.Control plaintext readOnly value={tallaDetails?.detalle_id_producto?.descripcion_producto || ''} />
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
                                {historialStock?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.descripcion_historial_stock}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{formatFechaHora(item.fecha_historial_stock, item.hora_historial_stock)}</td>
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

                    {/* Carrusel de imágenes */}
                    <Col md={4}>
                        <Card className="image-ropa-container">
                            <Card.Body className='text-center'>
                                {imagenes.length > 0 ? (
                                    <Carousel>
                                        {imagenes.map((imagen) => (
                                            <Carousel.Item key={imagen.id_imagen}>
                                                <Image 
                                                    src={imagen.nombre_imagen} 
                                                    alt={`Imagen del producto ${imagen.id_imagen}`} 
                                                    fluid 
                                                    rounded 
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <p>No hay imágenes disponibles para este producto.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetailADM;
