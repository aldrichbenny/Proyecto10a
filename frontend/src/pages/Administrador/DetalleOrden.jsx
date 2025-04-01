import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import '../../css/OrdenDetalle.css';
import { getDetallePedido, getDetallePerfilUsuario, getHistorialPedido, updatePedidoStatus } from "../../services/adminServices";
import { formatDate, formatTime, formatDateTime } from "../../utils/dateUtils";

const DetalleOrden = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [historialPedido, setHistorialPedido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelProcessing, setCancelProcessing] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getDetallePedido(id);
        if (data === 'Error en el servidor') {
          setError('Error al cargar los datos del pedido');
        } else {
          setOrder(data);
          const idUsuario = data.detalle_id_solicitud_producto.detalle_id_solicitud.detalle_id_usuario.id_usuario;
          const perfilData = await getDetallePerfilUsuario(idUsuario);
          if (perfilData !== 'Error en el servidor') {
            setPerfilUsuario(perfilData);
          }

          const historialData = await getHistorialPedido(id);
          if (historialData !== 'Error en el servidor') {
            const historialArray = Array.isArray(historialData) ? historialData : [historialData];
            setHistorialPedido(historialArray);
          }
        }
      } catch (err) {
        setError('Error al cargar los datos del pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    setCancelProcessing(true);
    setCancelError(null);
    
    try {
      const updateData = {
        id_pedido: order.id_pedido,
        detalle_id_solicitud_producto: order.detalle_id_solicitud_producto.id_solicitud_producto,
        detalle_id_area: order.detalle_id_area.id_area,
        cantidad_total: order.cantidad_total,
        estado_pedido: "CANCELLED"
      };
      
      const response = await updatePedidoStatus(id, updateData);
      
      if (response === 'Error en el servidor' || response.error) {
        setCancelError('Error al cancelar el pedido. Inténtelo de nuevo más tarde.');
      } else {
        setCancelSuccess(true);
        setOrder({
          ...order,
          estado_pedido: "CANCELLED"
        });
        
        const now = new Date();
        const newHistoryEntry = {
          id_historial_pedido: `temp-${Date.now()}`,
          fecha: now.toISOString().split('T')[0],
          hora: now.toTimeString().split(' ')[0],
          estado_seguimiento: "CANCELLED"
        };
        
        setHistorialPedido([...historialPedido, newHistoryEntry]);
      }
    } catch (err) {
      setCancelError('Error al cancelar el pedido. Inténtelo de nuevo más tarde.');
    } finally {
      setCancelProcessing(false);
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelSuccess(false);
    setCancelError(null);
  };

  if (loading) {
    return <div className="loading">Cargando detalles del pedido...</div>;
  }

  if (error || !order) {
    return <p>{error || 'Pedido no encontrado.'}</p>;
  }

  const producto = order.detalle_id_solicitud_producto.detalle_id_talla.detalle_id_producto;
  const talla = order.detalle_id_solicitud_producto.detalle_id_talla;
  const solicitud = order.detalle_id_solicitud_producto.detalle_id_solicitud;
  const cliente = solicitud.detalle_id_usuario;
  const area = order.detalle_id_area;

  const getNombreCompleto = () => {
    if (perfilUsuario) {
      return `${perfilUsuario.nombre} ${perfilUsuario.apellido_pat} ${perfilUsuario.apellido_mat}`;
    }
    return cliente.correo;
  };

  const traducirEstadoSeguimiento = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "Completado";
      case "IN PROGRESS":
        return "En proceso";
      case "PENDING":
        return "Pendiente";
      case "CANCELLED":
        return "Cancelado";
      default:
        return estado;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "COMPLETED":
        return "#4CAF50";
      case "IN PROGRESS":
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
        <div className="header">
          <h1 className="header-title">Detalle de Orden #{order.id_pedido}</h1>
          {/* {order.estado_pedido !== "CANCELLED" && order.estado_pedido !== "COMPLETED" && (
            <Button 
              variant="danger" 
              className="cancel-order-btn"
              onClick={() => setShowCancelModal(true)}
            >
              Cancelar Orden
            </Button>
          )} */}
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="dt-container">
                  <p className="dt-text"><strong>ID Pedido:</strong> {order.id_pedido}</p>
                  <p className="dt-text">
                    <strong>Fecha Registro:</strong> {formatDate(solicitud.fecha_registro)} a las {formatTime(solicitud.hora_registro)}
                  </p>
                  <p className="dt-text">
                    <strong>Fecha Entrega Estimada:</strong> {formatDate(solicitud.fecha_entrega_estimada)}
                  </p>
                  <p className={`dt-text estado-solicitud ${order.estado_pedido.toLowerCase()}`}>
                    <strong>Estado Pedido:</strong> {traducirEstadoSeguimiento(order.estado_pedido)}
                  </p>
                  <p className="dt-text"><strong>Área Actual:</strong> {area.nombre_area}</p>
                  <p className="dt-text"><strong>Responsable de Área:</strong> {area.detalle_id_usuario.correo}</p>
                  <h2 className="section-title">Información del Cliente</h2>
                  <p className="dt-text"><strong>Nombre:</strong> {getNombreCompleto()}</p>
                  <p className="dt-text"><strong>Correo:</strong> {cliente.correo}</p>
                  {perfilUsuario && (
                    <>
                      <p className="dt-text"><strong>Teléfono:</strong> {perfilUsuario.telefono}</p>
                      <p className="dt-text"><strong>Dirección:</strong> {perfilUsuario.direccion}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="separador-dt"></div>
              <div className="section">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Talla</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{producto.nombre_producto}</td>
                      <td>{talla.nombre_talla}</td>
                      <td>{order.cantidad_total}</td>
                      <td>${parseFloat(producto.precio_producto).toFixed(2)}</td>
                      <td>${(parseFloat(producto.precio_producto) * order.cantidad_total).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="separador-dt"></div>
              <div className="section">
                <h2 className="section-title-h">Historial del Pedido</h2>
                {historialPedido.length > 0 ? (
                  <div className="historial-container">
                    <table className="historial-table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Hora</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historialPedido.map((historial, index) => (
                          <tr key={historial.id_historial_pedido || index}>
                            <td>{formatDate(historial.fecha)}</td>
                            <td>{formatTime(historial.hora)}</td>
                            <td>
                              <span 
                                className="estado-badge"
                                style={{ backgroundColor: getEstadoColor(historial.estado_seguimiento) }}
                              >
                                {traducirEstadoSeguimiento(historial.estado_seguimiento)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No hay registros de historial para este pedido.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal show={showCancelModal} onHide={handleCloseCancelModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cancelar Orden</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!cancelSuccess ? (
              <>
                <p>¿Está seguro que desea cancelar la orden #{order.id_pedido}?</p>
                <p>Esta acción no se puede deshacer.</p>
                {cancelError && (
                  <div className="alert alert-danger" role="alert">
                    {cancelError}
                  </div>
                )}
              </>
            ) : (
              <div className="alert alert-success" role="alert">
                La orden ha sido cancelada exitosamente.
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!cancelSuccess ? (
              <>
                <Button variant="secondary" onClick={handleCloseCancelModal} disabled={cancelProcessing}>
                  Cancelar
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleCancelOrder} 
                  disabled={cancelProcessing}
                >
                  {cancelProcessing ? 'Procesando...' : 'Confirmar Cancelación'}
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={handleCloseCancelModal}>
                Cerrar
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DetalleOrden;
