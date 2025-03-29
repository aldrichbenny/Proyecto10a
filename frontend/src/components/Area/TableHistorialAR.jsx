import React, { useState } from 'react';
import { Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../../css/TableHistorialAR.css';

const TableHistorialAR = () => {
  const navigate = useNavigate();
  const initialOrders = [
    { id: 1, date: '28/02/2025 – 13:24:01 UTC-8' },
    { id: 2, date: '27/02/2025 – 10:15:32 UTC-8' },
    { id: 3, date: '26/02/2025 – 09:45:21 UTC-8' },
    { id: 4, date: '25/02/2025 – 14:30:45 UTC-8' },
    { id: 5, date: '24/02/2025 – 11:20:10 UTC-8' },
    { id: 6, date: '23/02/2025 – 16:55:33 UTC-8' },
    { id: 7, date: '22/02/2025 – 08:10:22 UTC-8' },
    { id: 8, date: '21/02/2025 – 12:40:15 UTC-8' },
    { id: 9, date: '20/02/2025 – 15:25:40 UTC-8' },
    { id: 10, date: '19/02/2025 – 17:35:50 UTC-8' },
    { id: 11, date: '18/02/2025 – 09:15:12 UTC-8' },
    { id: 12, date: '17/02/2025 – 13:50:30 UTC-8' },
    { id: 13, date: '16/02/2025 – 10:05:25 UTC-8' },
    { id: 14, date: '15/02/2025 – 14:20:18 UTC-8' },
    { id: 15, date: '14/02/2025 – 11:30:42 UTC-8' },
    { id: 16, date: '13/02/2025 – 16:45:55 UTC-8' },
    { id: 17, date: '12/02/2025 – 08:30:10 UTC-8' },
    { id: 18, date: '11/02/2025 – 12:15:35 UTC-8' },
    { id: 19, date: '10/02/2025 – 15:40:20 UTC-8' },
    { id: 20, date: '09/02/2025 – 17:25:45 UTC-8' },
    { id: 21, date: '08/02/2025 – 09:50:30 UTC-8' },
    { id: 22, date: '07/02/2025 – 13:35:15 UTC-8' },
    { id: 23, date: '06/02/2025 – 10:10:05 UTC-8' },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 15;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = orders.filter((order) =>
    order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="historial-AR-container">
      {/* Sección de búsqueda */}
      <div className="search-container">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar orden por fecha o hora"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      {/* Tabla */}
      <Table responsive className="historial-AR-tableCustom table-hover">
        <thead>
          <tr>
            <th className="historial-AR-header text-center">Número de orden</th>
            <th className="historial-AR-header text-center">Fecha y hora</th>
            <th className="historial-AR-header text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((order) => (
            <tr key={order.id}>
              <td className="historial-AR-cell text-center">Orden #{order.id}</td>
              <td className="historial-AR-cell text-center">{order.date}</td>
              <td className="historial-AR-cell text-center">
                <Button className="historial-AR-button btn-secondary" onClick={() => navigate('/historialDetailsAR')}>
                  Ver
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación */}
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
  );
};

export default TableHistorialAR;