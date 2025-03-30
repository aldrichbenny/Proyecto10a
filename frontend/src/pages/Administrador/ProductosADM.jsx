import React, { useState } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { CollectionFill, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/TableAR.css';

const ProductosADM = () => {
    const navigate = useNavigate();
    const initialData = [
        { id: 1, nombre: 'Camisa Polo', talla: 'M', cantidad: 500, precio: '$25.00' },
        { id: 2, nombre: 'Jeans Levis', talla: '32', cantidad: 300, precio: '$40.00' },
        { id: 3, nombre: 'Suéter Adidas', talla: 'L', cantidad: 200, precio: '$55.00' },
        { id: 4, nombre: 'Zapatos Nike', talla: '9', cantidad: 150, precio: '$75.00' },
        { id: 5, nombre: 'Chaqueta North Face', talla: 'XL', cantidad: 100, precio: '$120.00' },
        { id: 6, nombre: 'Pantalón Dockers', talla: '34', cantidad: 400, precio: '$35.00' },
        { id: 7, nombre: 'Playera Puma', talla: 'S', cantidad: 600, precio: '$20.00' },
        { id: 8, nombre: 'Sudadera Reebok', talla: 'M', cantidad: 250, precio: '$50.00' },
        { id: 9, nombre: 'Chamarra Columbia', talla: 'L', cantidad: 80, precio: '$130.00' },
        { id: 10, nombre: 'Calcetas Under Armour', talla: 'Única', cantidad: 700, precio: '$10.00' },
    ];

    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setData(sortedData);
        setCurrentPage(1);
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
        <div className="container">
            <div className="title-container">
                <div className='Symbol'><CollectionFill size={40} /></div>
                <div className='Title'>Productos</div>
                <button className='back-button' aria-label="Volver atrás"></button>
            </div>

            <div className="container2 pendiente-AR-container">
                <Table bordered hover className="pendiente-AR-tableCustom">
                    <thead>
                        <tr>
                            <th 
                                onClick={() => requestSort('id')}
                                style={{ cursor: 'pointer' }}
                                className='sortable-header'
                            >
                                Id producto{getSortIndicator('id')}
                            </th>
                            <th 
                                onClick={() => requestSort('nombre')}
                                style={{ cursor: 'pointer' }}
                                className='sortable-header'
                            >
                                Nombre{getSortIndicator('nombre')}
                            </th>
                            <th>Talla</th>
                            <th 
                                onClick={() => requestSort('cantidad')}
                                style={{ cursor: 'pointer' }}
                                className='sortable-header'
                            >
                                Cantidad total{getSortIndicator('cantidad')}
                            </th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.nombre}</td>
                                <td>{row.talla}</td>
                                <td>{row.cantidad}</td>
                                <td>{row.precio}</td>
                                <td>
                                  <Button className="historial-AR-button btn-warning" onClick={() => navigate('detailProducto')}>
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
                        {paginationItems}
                        <Pagination.Next 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default ProductosADM;