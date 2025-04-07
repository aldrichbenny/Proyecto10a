import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';
import { CollectionFill, PencilSquare, Trash3Fill, ExclamationCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/TableAR.css';

const ProductosADM = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchProduct, setSearchProduct] = useState("");
    const [searchTalla, setSearchTalla] = useState("");
    
    const itemsPerPage = 8;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/Talla/")
            .then(response => {
                const formattedData = response.data.map(item => ({
                    id: item.id_producto,
                    nombre: item.detalle_id_producto.nombre_producto,
                    talla: item.nombre_talla,
                    idtalla: item.id_talla,
                    cantidad: item.cantidad,
                    precio: `$${item.detalle_id_producto.precio_producto}`
                }));
                const sortedData = formattedData.sort((a, b) => a.idtalla - b.idtalla);
                setData(sortedData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    

    const filteredData = data.filter(item => 
        item.nombre.toLowerCase().includes(searchProduct.toLowerCase()) &&
        item.talla.toLowerCase().includes(searchTalla.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product); 
        setShowDeleteModal(true);
    };
    
    const handleConfirmDelete = () => {
        setData(data.filter(product => product.id !== selectedProduct.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="container">
            <div className="title-container">
                <div className='Symbol'><CollectionFill size={40} /></div>
                <div className='Title'>Productos</div>
                <button className='back-button' aria-label="Volver atrás"></button>
            </div>
                        
            <div className="search-container d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="Buscar por producto"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="me-2"
                />
                <Form.Control
                    type="text"
                    placeholder="Buscar por talla"
                    value={searchTalla}
                    onChange={(e) => setSearchTalla(e.target.value)}
                />
            </div>
            
            <div className="container2 pendiente-AR-container">
                <Table bordered hover className="pendiente-AR-tableCustom">
                    <thead>
                        <tr>
                            <th>Id producto</th>
                            <th>Nombre</th>
                            <th>Talla</th>
                            <th>Cantidad total</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.idtalla}</td>
                                <td>{row.nombre}</td>
                                <td>{row.talla}</td>
                                <td>{row.cantidad}</td>
                                <td>{row.precio}</td>
                                <td>
                                    <Button 
                                        className="historial-AR-button btn-warning" 
                                        onClick={() => navigate('/admin/productos/detailProducto', { state: { productoId: row.id, tallaid: row.idtalla } })}
                                    >
                                        <PencilSquare size={25} />
                                    </Button>
                                    <Button className="historial-AR-button btn-danger" onClick={() => handleDeleteClick(row)}>
                                        <Trash3Fill size={25} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.Prev 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <Pagination.Item 
                                key={number} 
                                active={number === currentPage}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <ExclamationCircle size={40} className='me-3'/> 
                    <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar el producto {selectedProduct?.nombre}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductosADM;
