import React, { useState } from 'react';
import { PeopleFill } from 'react-bootstrap-icons';
import { Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../../css/TableHistorialAR.css';

const ClienteADM = () => {
    const navigate = useNavigate();
    const initialClients = [
        { id: 1, companyName: 'Empresa A', contactName: 'Juan Pérez', phone: '555-1234', email: 'juan@example.com', registrationDate: '28/02/2025' },
        { id: 2, companyName: 'Empresa B', contactName: 'María López', phone: '555-5678', email: 'maria@example.com', registrationDate: '27/02/2025' },
        { id: 3, companyName: 'Empresa C', contactName: 'Carlos García', phone: '555-8765', email: 'carlos@example.com', registrationDate: '26/02/2025' },
        { id: 4, companyName: 'Empresa D', contactName: 'Ana Torres', phone: '555-4321', email: 'ana@example.com', registrationDate: '25/02/2025' },
        { id: 5, companyName: 'Empresa E', contactName: 'Luis Fernández', phone: '555-6789', email: 'luis@example.com', registrationDate: '24/02/2025' }
    ];

    const [clients, setClients] = useState(initialClients);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="container">
            <div className="title-container">
                <div className='Symbol'> <PeopleFill size={40} /> </div>
                <div className='Title'>Clientes</div>
                <button className='back-button' aria-label="Volver atrás"></button>
            </div>
            <div className="container2">
                <div className="historial-AR-container">
                    {/* Sección de búsqueda */}
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
                                        <Button className="historial-AR-button btn-secondary" onClick={() => navigate('/historialDetailsAR')}>
                                            Ver
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
        </div>
    );
};

export default ClienteADM;