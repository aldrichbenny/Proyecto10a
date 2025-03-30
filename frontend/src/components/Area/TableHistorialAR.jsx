import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import '../../css/TableHistorialAR.css';

const TableHistorialAR = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  const itemsPerPage = 15;
  const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;

    const storedUserId = storedUser.id_usuario;

    axios.get('http://127.0.0.1:8000/api/Area/')
      .then(response => {
        const area = response.data.find(area => area.detalle_id_usuario.id_usuario === storedUserId);
        if (!area) return;

        let apiUrl = '';
        if (area.nombre_area === 'Cut' || area.nombre_area === 'Packaging') {
          apiUrl = 'http://127.0.0.1:8000/api/Pedido/estado/SHIPPED/';
        }

        axios.get(apiUrl)
          .then(response => {
            const pedidosFiltrados = response.data.map(pedido => ({
              id_pedido: pedido.id_pedido,
              clienteId: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario,
              date: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro,
              hora: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.hora_registro.split('.')[0],
              prenda: pedido.detalle_id_solicitud_producto.detalle_id_talla.detalle_id_producto.nombre_producto,
              cantidad: pedido.detalle_id_solicitud_producto.cantidad_total
            }));

            const clientesIds = pedidosFiltrados.map(pedido => pedido.clienteId);

            axios.get('http://127.0.0.1:8000/api/Perfil/')
              .then(perfilesResponse => {
                const perfiles = perfilesResponse.data;
                const pedidosConNombre = pedidosFiltrados.map(pedido => {
                  const perfilCliente = perfiles.find(perfil => perfil.id_usuario === pedido.clienteId);
                  return {
                    ...pedido,
                    cliente: perfilCliente ? `${perfilCliente.nombre} ${perfilCliente.apellido_pat} ${perfilCliente.apellido_mat}` : 'Desconocido',
                  };
                });

                setOrders(pedidosConNombre);
              })
              .catch(error => console.error('Error fetching perfil data:', error));
          })
          .catch(error => console.error('Error fetching pedidos data:', error));
      })
      .catch(error => console.error('Error fetching area data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = orders.filter((order) =>
    (order.date ? order.date.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
    order.id_pedido.toString().includes(searchTerm)
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
            placeholder="Buscar orden por fecha o número"
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
            <tr key={order.id_pedido}>
              <td className="historial-AR-cell text-center">Orden #{order.id_pedido}</td>
              <td className="historial-AR-cell text-center">{order.date || 'Fecha no disponible'} {order.hora || 'Hora no disponible'}</td>
              <td className="historial-AR-cell text-center">
                <Button className="historial-AR-button btn-secondary" onClick={() => navigate('/historialDetailsAR', { state: { clienteId: order.clienteId, orderId: order.id_pedido, fechaR: order.date, horaR: order.hora} })}>
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
