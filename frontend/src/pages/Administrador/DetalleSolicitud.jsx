import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import '../../css/OrdenDetalle.css';
import { getDetalleSolicitud, getDetalleSolicitudProducto, getDetallePerfilUsuario, addPedido, updateSolicitudStatus } from "../../services/adminServices";
import { formatDate, formatTime } from "../../utils/dateUtils";

const DetalleSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitud, setSolicitud] = useState(null);
  const [solicitudProducto, setSolicitudProducto] = useState(null);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    const fetchSolicitudDetails = async () => {
      try {
        const solicitudData = await getDetalleSolicitud(id);
        if (solicitudData === 'Error en el servidor') {
          setError('Error al cargar los datos de la solicitud');
          return;
        }
        setSolicitud(solicitudData);

        const solicitudProductoData = await getDetalleSolicitudProducto(id);
        if (solicitudProductoData === 'Error en el servidor') {
          setError('Error al cargar los datos del producto de la solicitud');
          return;
        }
        setSolicitudProducto(solicitudProductoData[0]);

        if (solicitudData.id_usuario) {
          const perfilData = await getDetallePerfilUsuario(solicitudData.id_usuario);
          if (perfilData !== 'Error en el servidor') {
            setPerfilUsuario(perfilData);
          }
        }
      } catch (err) {
        setError('Error al cargar los datos de la solicitud');
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudDetails();
  }, [id]);

  const handleApprove = async () => {
    if (processingAction) return;
    
    // Check if the solicitud is in the correct state
    if (solicitud.estado_solicitud !== "IN REVIEW") {
      setActionMessage({ type: 'error', text: 'Solo se pueden aprobar solicitudes en estado "En revisión".' });
      return;
    }
    
    setShowDateModal(true);
  };

  const handleConfirmDate = async () => {
    if (!estimatedDeliveryDate) {
      setDateError('Por favor, ingrese una fecha de entrega estimada.');
      return;
    }

    setProcessingAction(true);
    setActionMessage({ type: 'info', text: 'Procesando solicitud...' });
    
    try {
      // Ensure the date is in the correct format (YYYY-MM-DD)
      const formattedDate = estimatedDeliveryDate.split('T')[0];
      
      // First update the solicitud status
      const updateSolicitudData = {
        estado_solicitud: "CUT-OFF-PENDING",
        id_usuario: solicitud.id_usuario,
        fecha_entrega_estimada: formattedDate,
        id_solicitud: parseInt(id)
      };
      
      const solicitudResponse = await updateSolicitudStatus(id, updateSolicitudData);
      
      if (solicitudResponse === 'Error en el servidor' || solicitudResponse.error) {
        setActionMessage({ type: 'error', text: 'Error al actualizar el estado de la solicitud. Inténtelo de nuevo.' });
        return;
      }
      
      // Then create the pedido
      const pedidoData = {
        estado_pedido: "CUT-OFF-PENDING",
        cantidad_total: solicitudProducto.cantidad_total,
        id_solicitud_producto: solicitudProducto.id_solicitud_producto,
        id_area: 1
      };
      
      const response = await addPedido(pedidoData);
      
      if (response === 'Error en el servidor' || response.error) {
        setActionMessage({ type: 'error', text: 'Error al aprobar la solicitud. Inténtelo de nuevo.' });
      } else {
        // Update local state to reflect the new status
        setSolicitud(prevState => ({
          ...prevState,
          estado_solicitud: "CUT-OFF-PENDING",
          fecha_entrega_estimada: formattedDate
        }));
        
        setActionMessage({ type: 'success', text: 'Solicitud aprobada correctamente. Redirigiendo...' });
        
        setTimeout(() => {
          navigate('/admin/ordenes');
        }, 1500);
      }
    } catch (error) {
      setActionMessage({ type: 'error', text: 'Error al aprobar la solicitud. Inténtelo de nuevo.' });
    } finally {
      setProcessingAction(false);
      setShowDateModal(false);
      setEstimatedDeliveryDate("");
      setDateError("");
    }
  };

  const handleReject = async () => {
    if (processingAction) return;
    
    // Check if the solicitud is in the correct state
    if (solicitud.estado_solicitud !== "IN REVIEW") {
      setActionMessage({ type: 'error', text: 'Solo se pueden rechazar solicitudes en estado "En revisión".' });
      return;
    }
    
    setProcessingAction(true);
    setActionMessage({ type: 'info', text: 'Procesando rechazo...' });
    
    try {
      const updateData = {
        estado_solicitud: "CANCELLED",
        id_usuario: solicitud.id_usuario
      };
      
      const response = await updateSolicitudStatus(id, updateData);
      
      if (response === 'Error en el servidor' || response.error) {
        setActionMessage({ type: 'error', text: 'Error al rechazar la solicitud. Inténtelo de nuevo.' });
      } else {
        setActionMessage({ type: 'success', text: 'Solicitud rechazada correctamente. Redirigiendo...' });
        
        setSolicitud(prevState => ({
          ...prevState,
          estado_solicitud: "CANCELLED"
        }));
        
        setTimeout(() => {
          navigate('/admin/solicitudes');
        }, 1500);
      }
    } catch (error) {
      setActionMessage({ type: 'error', text: 'Error al rechazar la solicitud. Inténtelo de nuevo.' });
    } finally {
      setProcessingAction(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando detalles de la solicitud...</div>;
  }

  if (error || !solicitud || !solicitudProducto) {
    return <p>{error || 'Solicitud no encontrada.'}</p>;
  }

  const producto = solicitudProducto.detalle_id_talla.detalle_id_producto;
  const talla = solicitudProducto.detalle_id_talla;
  const categoria = producto.detalle_id_categoria;
  const usuario = solicitud.detalle_id_usuario;

  const precioUnitario = parseFloat(producto.precio_producto);
  const cantidad = solicitudProducto.cantidad_total;
  const subtotal = precioUnitario * cantidad;
  const iva = subtotal * 0.16;
  const totalConIva = subtotal + iva;

  const getNombreCompleto = () => {
    if (perfilUsuario) {
      return `${perfilUsuario.nombre} ${perfilUsuario.apellido_pat} ${perfilUsuario.apellido_mat}`;
    }
    return usuario.correo;
  };

  const traducirEstadoSolicitud = (estado) => {
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

  const canPerformActions = solicitud.estado_solicitud === "IN REVIEW";

  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="header">
          <h1 className="header-title">Detalle de Solicitud #{solicitud.id_solicitud}</h1>
        </div>

        {actionMessage && (
          <div className={`action-message ${actionMessage.type}`}>
            {actionMessage.text}
          </div>
        )}

        <Modal show={showDateModal} onHide={() => setShowDateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ingrese la fecha de entrega estimada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="estimatedDeliveryDate">
                <Form.Label>Fecha de entrega estimada:</Form.Label>
                <Form.Control 
                  type="date" 
                  value={estimatedDeliveryDate} 
                  onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                />
                {dateError && (
                  <Form.Text className="text-danger">{dateError}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDateModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleConfirmDate}>Confirmar</Button>
          </Modal.Footer>
        </Modal>

        <div className="card-container">
          <div className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="dt-container">
                  <p className="dt-text"><strong>ID Solicitud:</strong> {solicitud.id_solicitud}</p>
                  <p className="dt-text">
                    <strong>Fecha Registro:</strong> {formatDate(solicitud.fecha_registro)} a las {formatTime(solicitud.hora_registro)}
                  </p>
                  <p className="dt-text">
                    <strong>Fecha Entrega Estimada:</strong> {formatDate(solicitud.fecha_entrega_estimada)}
                  </p>
                  <p className={`dt-text estado-solicitud ${solicitud.estado_solicitud.toLowerCase()}`}>
                    <strong>Estado:</strong> {traducirEstadoSolicitud(solicitud.estado_solicitud)}
                  </p>
                  
                  <h2 className="section-title">Información del Cliente</h2>
                  <p className="dt-text"><strong>Nombre:</strong> {getNombreCompleto()}</p>
                  <p className="dt-text"><strong>Email:</strong> {usuario.correo}</p>
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
                <h2 className="section-title-h">Detalles del Producto</h2>
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Talla</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{producto.nombre_producto}</td>
                      <td>{categoria.nombre_categoria}</td>
                      <td>{talla.nombre_talla}</td>
                      <td>{cantidad}</td>
                      <td>${precioUnitario.toFixed(2)}</td>
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="separador-dt"></div>

              {canPerformActions && (
                <div className="section">
                  <div className="action-buttons">
                    <button 
                      className="approve-btn" 
                      onClick={handleApprove}
                      disabled={processingAction}
                    >
                      {processingAction ? 'Procesando...' : 'Aprobar Solicitud'}
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={handleReject}
                      disabled={processingAction}
                    >
                      {processingAction ? 'Procesando...' : 'Rechazar Solicitud'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleSolicitud;