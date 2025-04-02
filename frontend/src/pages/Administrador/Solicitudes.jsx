import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { ListUl, Search, Eye, Trash } from 'react-bootstrap-icons';
import { FaSearch } from 'react-icons/fa';
import { formatDate } from "../../utils/dateUtils";
import "../../css/AdminSolicitudes.css";
import "../../css/TableHistorialAR.css";
import { getSolicitudes } from "../../services/adminServices";

const Solicitudes = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        setLoading(true);
        const response = await getSolicitudes();
        setSolicitudes(response);
      } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitudes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) =>
    solicitud.id_solicitud.toString().includes(searchTerm) ||
    solicitud.detalle_id_usuario.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(solicitud.fecha_registro).toLowerCase().includes(searchTerm.toLowerCase()) ||
    traducirEstado(solicitud.estado_solicitud).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);
  const currentSolicitudes = filteredSolicitudes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const traducirEstado = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "Completada";
      case "IN REVIEW":
        return "En revisión";
      case "PENDING":
        return "Pendiente";
      case "CANCELLED":
        return "Cancelada";
      default:
        return estado;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "#4CAF50";
      case "IN REVIEW":
        return "#FFC107";
      case "PENDING":
        return "#2196F3";
      case "CANCELLED":
        return "#f44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="frame-header">
          <ListUl size={40} color="white" className="me-3" />
          <h1 className="frame-title">Solicitudes</h1>
        </div>

        <div className="container2">
          <div className="historial-AR-container">
            <div className="search-container mb-4">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Buscar por ID, usuario, fecha o estado..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando solicitudes...</p>
              </div>
            ) : (
              <>
                <Table responsive className="historial-AR-tableCustom table-hover">
                  <thead>
                    <tr>
                      <th className="historial-AR-header text-center">ID</th>
                      <th className="historial-AR-header text-center">Usuario</th>
                      <th className="historial-AR-header text-center">Fecha de Registro</th>
                      <th className="historial-AR-header text-center">Fecha de Entrega</th>
                      <th className="historial-AR-header text-center">Estado</th>
                      <th className="historial-AR-header text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSolicitudes.length > 0 ? (
                      currentSolicitudes.map((solicitud) => (
                        <tr 
                          key={solicitud.id_solicitud}
                          className={solicitud.estado_solicitud === "CANCELLED" ? "cancelled-row" : ""}
                        >
                          <td className="historial-AR-cell">{solicitud.id_solicitud}</td>
                          <td className="historial-AR-cell">{solicitud.detalle_id_usuario.correo}</td>
                          <td className="historial-AR-cell">{formatDate(solicitud.fecha_registro)}</td>
                          <td className="historial-AR-cell">{formatDate(solicitud.fecha_entrega_estimada)}</td>
                          <td className="historial-AR-cell">
                            <span 
                              style={{
                                backgroundColor: getEstadoColor(solicitud.estado_solicitud),
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}
                            >
                              {traducirEstado(solicitud.estado_solicitud)}
                            </span>
                          </td>
                          <td className="historial-AR-cell">
                            <Button
                              className="historial-AR-button btn-info me-2"
                              onClick={() => navigate(`/admin/solicitud/${solicitud.id_solicitud}`)}
                            >
                              <Eye size={20} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          {searchTerm ? 'No se encontraron solicitudes que coincidan con la búsqueda.' : 'No hay solicitudes disponibles.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                {filteredSolicitudes.length > 0 && (
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solicitudes;