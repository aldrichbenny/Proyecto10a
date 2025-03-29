import React, { useState } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const itemsPerPage = 15;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    const sortedData = [...orders].sort((a, b) => {
      if (key === 'date') {
        const datePartA = a[key].split('–')[0].trim();
        const datePartB = b[key].split('–')[0].trim();
        const dateA = parseDate(datePartA);
        const dateB = parseDate(datePartB);
        return direction === 'ascending' ? dateA - dateB : dateB - dateA;
      }
      
      // Ordenamiento numérico para el ID
      if (key === 'id') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      }
      
      return 0;
    });
    
    setOrders(sortedData);
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

  const currentData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  let paginationItems = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    paginationItems.push(
      <Pagination.Item 
        key={1} 
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );
    if (startPage > 2) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
  }

  for (let number = startPage; number <= endPage; number++) {
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

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    paginationItems.push(
      <Pagination.Item 
        key={totalPages} 
        active={totalPages === currentPage}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <div className="historial-AR-container">
      <Table responsive className="historial-AR-tableCustom" style={{ marginBottom: '0' }}>
        <thead>
          <tr>
            <th 
              className="historial-AR-header text-center sortable-header"
              onClick={() => requestSort('id')}
              style={{ cursor: 'pointer' }}
            >
              Número de orden{getSortIndicator('id')}
            </th>
            <th 
              className="historial-AR-header text-center sortable-header"
              onClick={() => requestSort('date')}
              style={{ cursor: 'pointer' }}
            >
              Fecha y hora{getSortIndicator('date')}
            </th>
            <th className="historial-AR-header text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((order) => (
            <tr key={order.id} style={{ height: '40px' }}>
              <td className="historial-AR-cell text-center">Orden #{order.id}</td>
              <td className="historial-AR-cell text-center">{order.date}</td>
              <td className="historial-AR-cell text-center">
                <Button className="historial-AR-button" onClick={() => navigate('/historialDetailsAR')}>Ver</Button>
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
  );
};

export default TableHistorialAR;