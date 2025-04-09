import { useNavigate } from "react-router-dom";
import '../../css/Admin.css';
import { getPedidos, getDetallePerfilUsuario } from "../../services/adminServices";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { Table, Button, Pagination, InputGroup, FormControl, Form, Row, Col, Card, Accordion } from 'react-bootstrap';
import { ListUl, Eye, Grid, List, Calendar, Filter, X } from 'react-bootstrap-icons';
import "../../css/AdminSolicitudes.css";
import "../../css/TableHistorialAR.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Ordenes = () => {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('id_desc');
  const [perfilesUsuarios, setPerfilesUsuarios] = useState({});
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Nuevos estados para filtros
  const [estadosFiltro, setEstadosFiltro] = useState({
    PENDING: false,
    "IN PROGRESS": false,
    "IN REVIEW": false,
    "CUT-OFF": false,
    "CUT-OFF-PENDING": false,
    "CUT-OFF-ACCEPTED": false,
    PACKAGING: false,
    "PACKAGING-PENDING": false,
    "PACKAGING-ACCEPTED": false,
    SHIPPED: false,
    COMPLETED: false,
    CANCELLED: false
  });

  const [areasFiltro, setAreasFiltro] = useState({});
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [areasDisponibles, setAreasDisponibles] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await getPedidos();
        setPedidos(response);
        setFilteredPedidos(response);

        const perfilesPromises = response.map(pedido => {
          const idUsuario = pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          return getDetallePerfilUsuario(idUsuario)
            .then(perfil => ({ idUsuario, perfil }))
            .catch(() => ({ idUsuario, perfil: null }));
        });

        const perfilesResultados = await Promise.all(perfilesPromises);
        const perfilesMap = {};
        perfilesResultados.forEach(({ idUsuario, perfil }) => {
          if (perfil && perfil !== 'Error en el servidor') {
            perfilesMap[idUsuario] = perfil;
          }
        });

        setPerfilesUsuarios(perfilesMap);

        // Extraer áreas únicas de los pedidos
        const areasUnicas = [...new Set(response.map(pedido => pedido.detalle_id_area.nombre_area))];
        setAreasDisponibles(areasUnicas);

        // Inicializar el estado de filtros de áreas
        const initialAreasFiltro = {};
        areasUnicas.forEach(area => {
          initialAreasFiltro[area] = false;
        });
        setAreasFiltro(initialAreasFiltro);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };
    fetchPedidos();
  }, []);

  useEffect(() => {
    let result = [...pedidos];

    if (searchTerm) {
      result = result.filter(pedido => {
        const idUsuario = pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
        const perfil = perfilesUsuarios[idUsuario];
        const nombreCompleto = perfil ?
          `${perfil.nombre} ${perfil.apellido_pat} ${perfil.apellido_mat}`.toLowerCase() : '';

        const fechaRegistro = formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro).toLowerCase();
        const fechaEntrega = formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_entrega_estimada).toLowerCase();

        return pedido.id_pedido.toString().includes(searchTerm) ||
          pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fechaRegistro.includes(searchTerm.toLowerCase()) ||
          fechaEntrega.includes(searchTerm.toLowerCase()) ||
          traducirEstado(pedido.estado_pedido).toLowerCase().includes(searchTerm.toLowerCase()) ||
          pedido.detalle_id_area.nombre_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nombreCompleto.includes(searchTerm.toLowerCase());
      });
    }

    const estadosSeleccionados = Object.keys(estadosFiltro).filter(estado => estadosFiltro[estado]);
    if (estadosSeleccionados.length > 0) {
      result = result.filter(pedido => estadosSeleccionados.includes(pedido.estado_pedido));
    }

    const areasSeleccionadas = Object.keys(areasFiltro).filter(area => areasFiltro[area]);
    if (areasSeleccionadas.length > 0) {
      result = result.filter(pedido => areasSeleccionadas.includes(pedido.detalle_id_area.nombre_area));
    }

    if (fechaInicio && fechaFin) {
      result = result.filter(pedido => {
        const fechaPedido = new Date(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro);
        const f1UTC = new Date(fechaPedido.toISOString());
        const f2UTC = new Date(fechaInicio.toISOString());
        const f3UTC = new Date(fechaFin.toISOString());
        f1UTC.setDate(f1UTC.getDate() + 1);
        return f1UTC >= f2UTC && f1UTC <= f3UTC;
      });
    } else if (fechaInicio) {
      result = result.filter(pedido => {
        const fechaPedido = new Date(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro);
        const f1UTC = new Date(fechaPedido.toISOString());
        const f2UTC = new Date(fechaInicio.toISOString());
        return f1UTC.setDate(f1UTC.getDate() + 1) >= f2UTC;
      });
    } else if (fechaFin) {
      result = result.filter(pedido => {
        const fechaPedido = new Date(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro);
        const f1UTC = new Date(fechaPedido.toISOString());
        const f2UTC = new Date(fechaFin.toISOString());
        return f1UTC.setDate(f1UTC.getDate() + 1) <= f2UTC;
      });
    }

    // Aplicar ordenamiento
    switch (sortOption) {
      case 'id_asc':
        result.sort((a, b) => a.id_pedido - b.id_pedido);
        break;
      case 'id_desc':
        result.sort((a, b) => b.id_pedido - a.id_pedido);
        break;
      case 'fecha_asc':
        result.sort((a, b) =>
          new Date(a.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro) -
          new Date(b.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro)
        );
        break;
      case 'fecha_desc':
        result.sort((a, b) =>
          new Date(b.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro) -
          new Date(a.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro)
        );
        break;
      case 'cliente_asc':
        result.sort((a, b) => {
          const idUsuarioA = a.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          const idUsuarioB = b.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          const perfilA = perfilesUsuarios[idUsuarioA];
          const perfilB = perfilesUsuarios[idUsuarioB];

          const nombreA = perfilA ? `${perfilA.nombre} ${perfilA.apellido_pat}` :
            a.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo;
          const nombreB = perfilB ? `${perfilB.nombre} ${perfilB.apellido_pat}` :
            b.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo;

          return nombreA.localeCompare(nombreB);
        });
        break;
      case 'cliente_desc':
        result.sort((a, b) => {
          const idUsuarioA = a.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          const idUsuarioB = b.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          const perfilA = perfilesUsuarios[idUsuarioA];
          const perfilB = perfilesUsuarios[idUsuarioB];

          const nombreA = perfilA ? `${perfilA.nombre} ${perfilA.apellido_pat}` :
            a.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo;
          const nombreB = perfilB ? `${perfilB.nombre} ${perfilB.apellido_pat}` :
            b.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo;

          return nombreB.localeCompare(nombreA);
        });
        break;
      default:
        break;
    }

    setFilteredPedidos(result);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
  }, [pedidos, searchTerm, sortOption, perfilesUsuarios, estadosFiltro, areasFiltro, fechaInicio, fechaFin]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Nuevas funciones para manejar los filtros
  const handleEstadoChange = (estado) => {
    setEstadosFiltro(prev => ({
      ...prev,
      [estado]: !prev[estado]
    }));
  };

  const handleAreaChange = (area) => {
    setAreasFiltro(prev => ({
      ...prev,
      [area]: !prev[area]
    }));
  };

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
  };

  const limpiarFiltros = () => {
    // Resetear todos los filtros
    const resetEstados = {};
    Object.keys(estadosFiltro).forEach(estado => {
      resetEstados[estado] = false;
    });
    setEstadosFiltro(resetEstados);

    const resetAreas = {};
    Object.keys(areasFiltro).forEach(area => {
      resetAreas[area] = false;
    });
    setAreasFiltro(resetAreas);

    setFechaInicio(null);
    setFechaFin(null);
  };

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  const getProgressBarColor = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "green";
      case "IN PROGRESS":
        return "yellow";
      case "PENDING":
        return "blue";
      case "IN REVIEW":
        return "orange";
      case "CUT-OFF":
        return "purple";
      case "PACKAGING":
        return "orange";
      case "CUT-OFF-PENDING":
        return "#673AB7";
      case "CUT-OFF-ACCEPTED":
        return "lightgreen";
      case "PACKAGING-PENDING":
        return "darkorange";
      case "PACKAGING-ACCEPTED":
        return "teal";
      case "SHIPPED":
        return "indigo";
      case "CANCELLED":
        return "red";
      default:
        return "gray";
    }
  };

  const getProgressBarWidth = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "100%";
      case "IN PROGRESS":
        return "50%";
      case "PENDING":
        return "25%";
      case "IN REVIEW":
        return "35%";
      case "CUT-OFF":
        return "45%";
      case "PACKAGING":
        return "65%";
      case "CUT-OFF-PENDING":
        return "40%";
      case "CUT-OFF-ACCEPTED":
        return "55%";
      case "PACKAGING-PENDING":
        return "70%";
      case "PACKAGING-ACCEPTED":
        return "85%";
      case "SHIPPED":
        return "95%";
      case "CANCELLED":
        return "100%";
      default:
        return "0%";
    }
  };

  const traducirEstado = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "Completada";
      case "IN PROGRESS":
        return "En proceso";
      case "PENDING":
        return "Pendiente";
      case "IN REVIEW":
        return "En revisión";
      case "CUT-OFF":
        return "Corte";
      case "PACKAGING":
        return "Empaquetado";
      case "CUT-OFF-PENDING":
        return "Corte pendiente";
      case "CUT-OFF-ACCEPTED":
        return "Corte aceptado";
      case "PACKAGING-PENDING":
        return "Empaquetado pendiente";
      case "PACKAGING-ACCEPTED":
        return "Empaquetado aceptado";
      case "SHIPPED":
        return "Enviado";
      case "CANCELLED":
        return "Cancelada";
      default:
        return estado;
    }
  };

  const getNombreCliente = (pedido) => {
    const idUsuario = pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
    const perfil = perfilesUsuarios[idUsuario];

    if (perfil) {
      return `${perfil.nombre} ${perfil.apellido_pat} ${perfil.apellido_mat}`;
    }

    return pedido.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.correo;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);
  const currentPedidos = viewMode === 'table'
    ? filteredPedidos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredPedidos;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="ordenes-header-o">
          <h1 className="ordenes-header-title">Órdenes</h1>
          <div className="view-mode-toggle">
            <Button
              variant={viewMode === 'table' ? 'light' : 'outline-light'}
              onClick={() => handleViewModeChange('table')}
            >
              <List size={20} />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'light' : 'outline-light'}
              className="me-2"
              onClick={() => handleViewModeChange('cards')}
            >
              <Grid size={20} />
            </Button>
          </div>
        </div>

        <div className="ordenes-filters">
          <div className="ordenes-search">
            <input
              type="text"
              placeholder="Buscar por ID, cliente, fecha, estado o área..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="ordenes-search-input"
            />
          </div>

          <Button
            variant={mostrarFiltros ? "primary" : "outline-primary"}
            className="me-2 no-mg"
            onClick={toggleFiltros}
          >
            <Filter size={18} className="me-1" /> Filtros
          </Button>

          <div className="ordenes-sort">
            <label htmlFor="sort-select">Ordenar por: </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="ordenes-sort-select"
            >
              <option value="id_desc">ID (Mayor a menor)</option>
              <option value="id_asc">ID (Menor a mayor)</option>
              <option value="fecha_desc">Fecha (Más reciente)</option>
              <option value="fecha_asc">Fecha (Más antigua)</option>
              <option value="cliente_asc">Cliente (A-Z)</option>
              <option value="cliente_desc">Cliente (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Panel de filtros avanzados */}
        {mostrarFiltros && (
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col md={12} className="mb-2 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Filtros avanzados</h5>
                  <Button variant="outline-secondary" size="sm" onClick={limpiarFiltros}>
                    <X size={16} className="me-1" /> Limpiar filtros
                  </Button>
                </Col>

                <Col md={4}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Filtrar por Estado</Accordion.Header>
                      <Accordion.Body className="p-2">
                        <div className="d-flex flex-wrap">
                          {Object.keys(estadosFiltro).map(estado => (
                            <Form.Check
                              key={estado}
                              type="checkbox"
                              id={`estado-${estado}`}
                              label={traducirEstado(estado)}
                              checked={estadosFiltro[estado]}
                              onChange={() => handleEstadoChange(estado)}
                              className="me-3 mb-2"
                            />
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>

                <Col md={4}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Filtrar por Área</Accordion.Header>
                      <Accordion.Body className="p-2">
                        <div className="d-flex flex-wrap">
                          {areasDisponibles.map(area => (
                            <Form.Check
                              key={area}
                              type="checkbox"
                              id={`area-${area}`}
                              label={area}
                              checked={areasFiltro[area]}
                              onChange={() => handleAreaChange(area)}
                              className="me-3 mb-2"
                            />
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>

                <Col md={4}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Filtrar por Fecha</Accordion.Header>
                      <Accordion.Body className="p-2">
                        <Form.Group className="mb-2">
                          <Form.Label>Fecha Inicio:</Form.Label>
                          <DatePicker
                            selected={fechaInicio}
                            onChange={handleFechaInicioChange}
                            selectsStart
                            startDate={fechaInicio}
                            endDate={fechaFin}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccionar fecha"
                            isClearable
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Fecha Fin:</Form.Label>
                          <DatePicker
                            selected={fechaFin}
                            onChange={handleFechaFinChange}
                            selectsEnd
                            startDate={fechaInicio}
                            endDate={fechaFin}
                            minDate={fechaInicio}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccionar fecha"
                            isClearable
                          />
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {viewMode === 'cards' ? (
          <div className="ordenes-card-container container2">
            {filteredPedidos.length > 0 ? (
              filteredPedidos.map((pedido) => (
                <div
                  key={pedido.id_pedido}
                  className={`ordenes-card ${pedido.estado_pedido.toLowerCase()}`}
                  onClick={() => navigate(`/admin/orden/${pedido.id_pedido}`)}
                  aria-label={`Ver detalles de la orden ${pedido.id_pedido}`}
                >
                  <div className="ordenes-card-content">
                    <div className="ordenes-card-header">
                      <div>
                        <p className="ordenes-label">Fecha registro:</p>
                        <p className="ordenes-value">{formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro)}</p>
                      </div>
                      <div className="ordenes-right-align">
                        <p className="ordenes-label">Fecha de entrega:</p>
                        <p className="ordenes-value">{formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_entrega_estimada)}</p>
                      </div>
                    </div>

                    <div className="ordenes-card-body">
                      <h2 className="ordenes-id">ID: {pedido.id_pedido}</h2>
                      <div className="ordenes-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ordenes-arrow-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="ordenes-progress-bar">
                      <p className="ordenes-label">Estado: {traducirEstado(pedido.estado_pedido)}</p>
                      <div className="ordenes-progress-container">
                        <div
                          className="ordenes-progress"
                          style={{
                            background: getProgressBarColor(pedido.estado_pedido),
                            width: getProgressBarWidth(pedido.estado_pedido)
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="ordenes-card-footer">
                      <div>
                        <p className="ordenes-label">Area actual:</p>
                        <p className="ordenes-value">{pedido.detalle_id_area.nombre_area}</p>
                      </div>
                      <div className="ordenes-right-align">
                        <p className="ordenes-label">Cliente:</p>
                        <p className="ordenes-value">{getNombreCliente(pedido)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="ordenes-no-results">
                <p>No se encontraron órdenes que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="container2">
            <div className="historial-AR-container">
              <Table responsive className="historial-AR-tableCustom table-hover">
                <thead>
                  <tr>
                    <th className="historial-AR-header text-center">ID</th>
                    <th className="historial-AR-header text-center">Cliente</th>
                    <th className="historial-AR-header text-center">Fecha de Registro</th>
                    <th className="historial-AR-header text-center">Fecha de Entrega</th>
                    <th className="historial-AR-header text-center">Estado</th>
                    <th className="historial-AR-header text-center">Área</th>
                    <th className="historial-AR-header text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPedidos.length > 0 ? (
                    currentPedidos.map((pedido) => (
                      <tr
                        key={pedido.id_pedido}
                        className={pedido.estado_pedido === "CANCELLED" ? "cancelled-row" : ""}
                      >
                        <td className="historial-AR-cell">{pedido.id_pedido}</td>
                        <td className="historial-AR-cell">{getNombreCliente(pedido)}</td>
                        <td className="historial-AR-cell">{formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_registro)}</td>
                        <td className="historial-AR-cell">{formatDate(pedido.detalle_id_solicitud_producto.detalle_id_solicitud.fecha_entrega_estimada)}</td>
                        <td className="historial-AR-cell">
                          <span
                            style={{
                              backgroundColor: getProgressBarColor(pedido.estado_pedido),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            {traducirEstado(pedido.estado_pedido)}
                          </span>
                        </td>
                        <td className="historial-AR-cell">{pedido.detalle_id_area.nombre_area}</td>
                        <td className="historial-AR-cell">
                          <Button
                            className="historial-AR-button btn-info"
                            onClick={() => navigate(`/admin/orden/${pedido.id_pedido}`)}
                          >
                            <Eye size={20} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        {searchTerm ? 'No se encontraron órdenes que coincidan con la búsqueda.' : 'No hay órdenes disponibles.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {filteredPedidos.length > 0 && viewMode === 'table' && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordenes;