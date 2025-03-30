import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/TableAR.css';

const TableProcesoAR = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const itemsPerPage = 8;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedUserId = storedUser.id_usuario;

        axios.get('http://127.0.0.1:8000/api/Area/')
            .then(response => {
                const area = response.data.find(area => area.detalle_id_usuario.id_usuario === storedUserId);

                if (area) {
                    const areaName = area.nombre_area;
                    let apiUrl = '';

                    if (areaName === 'Cut') {
                        apiUrl = 'http://127.0.0.1:8000/api/Pedido/estado/CUT-OFF-ACCEPTED/';
                    } else if (areaName === 'Packaging') {
                        apiUrl = 'http://127.0.0.1:8000/api/Pedido/estado/PACKAGING-ACCEPTED/';
                    }

                    axios.get(apiUrl)
                        .then(response => {
                            const pedidosFiltrados = response.data.filter(pedido => 
                                pedido.detalle_id_area?.id_usuario === storedUserId 
                            ).map(pedido => ({
                                id_pedido: pedido.id_pedido,
                                clienteId: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario,
                                fecha: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro,
                                hora: pedido.detalle_id_solicitud_producto.detalle_id_solicitud.hora_registro,
                                prenda: pedido.detalle_id_solicitud_producto.detalle_id_talla.detalle_id_producto.nombre_producto,
                                cantidad: pedido.detalle_id_solicitud_producto.cantidad_total
                            }));

                            // Obtener los perfiles de los clientes
                            const clientesIds = pedidosFiltrados.map(pedido => pedido.clienteId);
                            axios.get('http://127.0.0.1:8000/api/Perfil/')
                                .then(perfilesResponse => {
                                    const perfiles = perfilesResponse.data;
                                    const pedidosConNombre = pedidosFiltrados.map(pedido => {
                                        const perfilCliente = perfiles.find(perfil => perfil.id_usuario === pedido.clienteId);
                                        return {
                                            ...pedido,
                                            cliente: perfilCliente ? `${perfilCliente.nombre} ${perfilCliente.apellido_pat} ${perfilCliente.apellido_mat}` : 'Desconocido'
                                        };
                                    });
                                    setData(pedidosConNombre);
                                })
                                .catch(error => console.error('Error fetching perfil data:', error));
                        })
                        .catch(error => console.error('Error fetching data from Pedidos API:', error));
                }
            })
            .catch(error => console.error('Error fetching area data:', error));

    }, []);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (key === 'fecha') {
                return direction === 'ascending' ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
            }
            return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        });

        setData(sortedData);
        setCurrentPage(1);
    };

    const getSortIndicator = (key) => sortConfig.key === key ? (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓') : '';

    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="pendiente-AR-container">
            <div className="pendiente-AR-tableResponsive">
                <Table bordered hover className="pendiente-AR-tableCustom">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('cliente')} style={{ cursor: 'pointer' }} className='sortable-header'>
                                Cliente{getSortIndicator('cliente')}
                            </th>
                            <th onClick={() => requestSort('fecha')} style={{ cursor: 'pointer' }} className='sortable-header'>
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
                                    <Button 
                                        className="pendiente-AR-btnView btn-secondary" 
                                        
                                        onClick={() => {
                                            navigate('/procesoDetailsAR', { state: { clienteId: row.clienteId, orderId: row.id_pedido, fechaR: row.fecha, horaR: row.hora } });
                                        }}                                    >
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
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} />
                    {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(num => (
                        <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => setCurrentPage(num + 1)}>
                            {num + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(Math.ceil(data.length / itemsPerPage), prev + 1))} disabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
                </Pagination>
            </div>
        </div>
    );
};

export default TableProcesoAR;
