import React, { useState, useEffect } from 'react';
import { PeopleFill, PencilSquare, Trash3Fill, ExclamationCircle, PencilFill } from 'react-bootstrap-icons';
import { Table, Button, Pagination, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios'; // Importa axios
import '../../css/TableHistorialAR.css';

const ClienteADM = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [editData, setEditData] = useState({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        telefono: '',
        direccion: '',
    });
    const itemsPerPage = 5;

    // Fetch the data when the component mounts
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/Perfil/')
            .then(response => {
                // Filtra solo los usuarios con id_rol igual a 1
                const filteredUsers = response.data.filter(user => user.detalle_id_usuario.id_rol === 1);
                setClients(filteredUsers);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = clients.filter((client) =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.apellido_pat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.apellido_mat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.telefono.includes(searchTerm) ||
        client.detalle_id_usuario.correo.toLowerCase().includes(searchTerm) ||
        client.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditClick = (client) => {
        setSelectedClient(client);
        // Obtener los datos actuales del perfil desde la API de perfil
        axios.get(`http://127.0.0.1:8000/api/Perfil/${client.id_perfil}`)
            .then(response => {
                const perfilData = response.data;
                setEditData({
                    nombre: perfilData.nombre,
                    apellido_pat: perfilData.apellido_pat,
                    apellido_mat: perfilData.apellido_mat,
                    telefono: perfilData.telefono,
                    direccion: perfilData.direccion,
                });
                setShowEditModal(true);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveEdit = () => {
        axios.get(`http://127.0.0.1:8000/api/Perfil/${selectedClient.id_perfil}`)
            .then(response => {
                const currentProfileData = response.data;
    
                axios.put(`http://127.0.0.1:8000/api/Perfil/${selectedClient.id_perfil}/`, {
                    id_perfil: currentProfileData.id_perfil,
                    nombre: editData.nombre || currentProfileData.nombre,
                    apellido_pat: currentProfileData.apellido_pat,
                    apellido_mat: currentProfileData.apellido_mat,
                    telefono: editData.telefono || currentProfileData.telefono,
                    direccion: editData.direccion || currentProfileData.direccion,
                    id_usuario: currentProfileData.id_usuario
                })
                .then(response => {
    
                    setUpdateMessage('¡Perfil actualizado correctamente!');
                    
                    axios.get('http://127.0.0.1:8000/api/Perfil/')
                        .then(response => {
                            const filteredUsers = response.data.filter(user => user.detalle_id_usuario.id_rol === 1);
                            setClients(filteredUsers);
                        })
                        .catch(error => {
                            console.error('Error fetching data after update:', error);
                        });
                        setShowEditModal(false);
                })
                .catch(error => {
                    console.error('Error al actualizar perfil:', error.response ? error.response.data : error.message);
                    setUpdateMessage('Error al actualizar el perfil.');
                });
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    };
    
    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/Perfil/${selectedClient.id_perfil}/`)
            .then(response => {
                console.log('Perfil eliminado:', response.data);    
                return axios.delete(`http://127.0.0.1:8000/api/Usuario/${selectedClient.id_usuario}/`);
            })
            .then(response => {
                console.log('Usuario eliminado:', response.data);
                
                setClients(clients.filter(client => client.id_perfil !== selectedClient.id_perfil));
                setUpdateMessage('¡Cliente eliminado correctamente!');
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error al eliminar:', error);
            });
    };
    
    

    return (
        <div className="container">
            <div className="title-container">
                <div className='Symbol'><PeopleFill size={40} /></div>
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
                                <th className="historial-AR-header text-center">Correo</th>
                                <th className="historial-AR-header text-center">Nombre</th>
                                <th className="historial-AR-header text-center">Teléfono</th>
                                <th className="historial-AR-header text-center">Dirección</th>
                                <th className="historial-AR-header text-center">Categoria</th>
                                <th className="historial-AR-header text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((client) => (
                                <tr key={client.id_perfil}>
                                    <td className="historial-AR-cell text-center">{client.id_perfil}</td>
                                    <td className="historial-AR-cell text-center">{client.detalle_id_usuario.correo}</td>
                                    <td className="historial-AR-cell text-center">{client.nombre} {client.apellido_pat} {client.apellido_mat}</td>
                                    <td className="historial-AR-cell text-center">{client.telefono}</td>
                                    <td className="historial-AR-cell text-center">{client.direccion}</td>
                                    <td className="historial-AR-cell text-center">{client.detalle_id_usuario.detalle_id_rol.nombre_rol}</td>
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
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="nombre" value={editData?.nombre} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control name="direccion" value={editData?.direccion} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="telefono" value={editData?.telefono} onChange={handleEditChange} />
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
                    <ExclamationCircle size={30} className="me-2" />
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>

            {updateMessage && (
                <div className="alert alert-success mt-3">
                    {updateMessage}
                </div>
            )}

        </div>
    );
};

export default ClienteADM;
