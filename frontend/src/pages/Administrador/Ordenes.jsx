import { useNavigate } from "react-router-dom";
import '../../css/Admin.css';
import { getPedidos, getDetallePerfilUsuario } from "../../services/adminServices";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";

const Ordenes = () => {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('id_desc');
  const [perfilesUsuarios, setPerfilesUsuarios] = useState({});

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
  }, [pedidos, searchTerm, sortOption, perfilesUsuarios]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const getProgressBarColor = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "green";
      case "IN PROGRESS":
        return "yellow";
      case "PENDING":
        return "blue";
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

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="ordenes-header">
          <h1 className="ordenes-header-title">Órdenes</h1>
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
                          backgroundColor: getProgressBarColor(pedido.estado_pedido),
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
      </div>
    </div>
  );
};

export default Ordenes;