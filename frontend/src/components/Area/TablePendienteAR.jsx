import React, { useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/TableAR.css'

const TablePendienteAR = () => {
    const navigate = useNavigate();
    const initialData = [
        { cliente: 'Nombre cliente 1', fecha: '01/01/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 2', fecha: '15/02/2023', prenda: 'Pantalon Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 3', fecha: '03/03/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 4', fecha: '20/01/2023', prenda: 'Pantalon Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 5', fecha: '05/05/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 6', fecha: '10/04/2023', prenda: 'Pantalon Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 7', fecha: '25/03/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 8', fecha: '12/02/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 9', fecha: '08/05/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 10', fecha: '30/01/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 11', fecha: '17/03/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 12', fecha: '22/04/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 13', fecha: '14/02/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
        { cliente: 'Nombre cliente 14', fecha: '28/03/2023', prenda: 'Camisa Luis Vouiton', cantidad: 1000 },
    ];

    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        
        const sortedData = [...data].sort((a, b) => {
            if (key === 'fecha') {
                const dateA = parseDate(a[key]);
                const dateB = parseDate(b[key]);
                return direction === 'ascending' ? dateA - dateB : dateB - dateA;
            }
            
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        
        setData(sortedData);
        setCurrentPage(1);
    };

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    };

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item 
                key={number} 
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="pendiente-AR-container">
            <div className="pendiente-AR-tableResponsive">
                <Table bordered hover className="pendiente-AR-tableCustom">
                    <thead>
                        <tr>
                            <th 
                                onClick={() => requestSort('cliente')}
                                style={{ cursor: 'pointer' }}
                                className='sortable-header'
                            >
                                Cliente{getSortIndicator('cliente')}
                            </th>
                            <th 
                                onClick={() => requestSort('fecha')}
                                style={{ cursor: 'pointer' }}
                                className='sortable-header'
                            >
                                Fecha de registro{getSortIndicator('fecha')}
                            </th>
                            <th>Prenda</th>
                            <th>Cantidad total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.cliente}</td>
                                <td>{row.fecha}</td>
                                <td>{row.prenda}</td>
                                <td>{row.cantidad}</td>
                                <td>
                                    <Button className="pendiente-AR-btnView btn-secondary" onClick={() => navigate('/pendienteDetailsAR')}>
                                        Ver
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.Prev 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                        disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
    );
};

export default TablePendienteAR;