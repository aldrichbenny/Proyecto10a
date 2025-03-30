import React, { useState } from 'react';
import { PeopleFill, PencilSquare, Trash3Fill, ExclamationCircle, PencilFill} from 'react-bootstrap-icons';
import { Table, Button, Pagination, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../../css/TableHistorialAR.css';

const ClienteADM = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const initialClients = [
        { id: 1, companyName: 'Empresa A', contactName: 'Juan Pérez', phone: '555-1234', email: 'juan@example.com', registrationDate: '28/02/2025' },
        { id: 2, companyName: 'Empresa B', contactName: 'María López', phone: '555-5678', email: 'maria@example.com', registrationDate: '27/02/2025' },
        { id: 3, companyName: 'Empresa C', contactName: 'Carlos García', phone: '555-8765', email: 'carlos@example.com', registrationDate: '26/02/2025' },
        { id: 4, companyName: 'Empresa D', contactName: 'Ana Torres', phone: '555-4321', email: 'ana@example.com', registrationDate: '25/02/2025' },
        { id: 5, companyName: 'Empresa E', contactName: 'Luis Fernández', phone: '555-6789', email: 'luis@example.com', registrationDate: '24/02/2025' }
    ];
    const [clients, setClients] = useState(initialClients);
    const [editData, setEditData] = useState(null)
    const itemsPerPage = 5;
    const totalPages = Math.ceil(clients.length / itemsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = clients.filter((client) =>
        client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.registrationDate.includes(searchTerm)
    );

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditClick = (client) => {
        setSelectedClient(client);
        setEditData({ ...client });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveEdit = () => {
        setClients(clients.map(client => (client.id === editData.id ? editData : client)));
        setShowEditModal(false);
    };

    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setClients(clients.filter(client => client.id !== selectedClient.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="container">
            <div className="title-container">
                <div className='Symbol'> <PeopleFill size={40} /> </div>
                <div className='Title'>Clientes</div>
                <button className='back-button' aria-label="Volver atrás"></button>
            </div>
            <div className="container2">
                <div className="historial-AR-container">
                    <div className="search-container">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Buscar cliente por nombre, teléfono o correo"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </div>

                    <Table responsive className="historial-AR-tableCustom table-hover">
                        <thead>
                            <tr>
                                <th className="historial-AR-header text-center">ID</th>
                                <th className="historial-AR-header text-center">Nombre empresa</th>
                                <th className="historial-AR-header text-center">Nombre contacto</th>
                                <th className="historial-AR-header text-center">Teléfono</th>
                                <th className="historial-AR-header text-center">Correo</th>
                                <th className="historial-AR-header text-center">Fecha de registro</th>
                                <th className="historial-AR-header text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((client) => (
                                <tr key={client.id}>
                                    <td className="historial-AR-cell text-center">{client.id}</td>
                                    <td className="historial-AR-cell text-center">{client.companyName}</td>
                                    <td className="historial-AR-cell text-center">{client.contactName}</td>
                                    <td className="historial-AR-cell text-center">{client.phone}</td>
                                    <td className="historial-AR-cell text-center">{client.email}</td>
                                    <td className="historial-AR-cell text-center">{client.registrationDate}</td>
                                    <td className="historial-AR-cell text-center">
                                        <Button className="historial-AR-button btn-warning" onClick={() => handleEditClick(client)}>
                                            <PencilSquare size={25} />
                                        </Button>
                                        <Button className="historial-AR-button btn-danger" onClick={() => handleDeleteClick(client)}>
                                            <Trash3Fill size={25} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-center mt-3">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === currentPage}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <PencilFill size={30} className='me-2' />
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre Empresa</Form.Label>
                            <Form.Control name="companyName" value={editData?.companyName} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre Contacto</Form.Label>
                            <Form.Control name="contactName" value={editData?.contactName} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="phone" value={editData?.phone} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control name="email" value={editData?.email} onChange={handleEditChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button variant="success" onClick={handleSaveEdit}>Guardar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <ExclamationCircle size={40} className='me-3'/> 
                    <Modal.Title>Eliminar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar a {selectedClient?.contactName}?
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

export default ClienteADM;