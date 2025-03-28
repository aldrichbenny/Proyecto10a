import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

//////Solicitud//////
export const getSolicitud = () => {
    return axios.get(`${BASE_URL}/Solicitud/`);
};

export const createSolicitud = (data) => {
    return axios.post(`${BASE_URL}/Solicitud/`, data);
};

export const getDetailSolicitud = (id) => {
    axios.get(`${BASE_URL}/Solicitud/${id}`);
};

export const updateSolicitud = (id,data) => {
    axios.put(`${BASE_URL}/Solicitud/${id}`, data);
};

export const deleteSolicitud = (id) => {
    axios.delete(`${BASE_URL}/Solicitud/${id}`);
}

//////Solicitud_Producto//////
export const getSolicitudProducto = () => {
    axios.get(`${BASE_URL}/Solicitud_producto/`);
};

export const createSolicitudProducto = (data) => {
    axios.post(`${BASE_URL}/Solicitud_producto/`, data);
};

export const getDetailSolicitudProducto = (id) => {
    axios.get(`${BASE_URL}/Solicitud_producto/${id}`);
};

export const updateSolicitudProducto = (id,data) => {
    axios.put(`${BASE_URL}/Solicitud_producto/${id}`, data);
};

export const deleteSolicitudProducto = (id) => {
    axios.delete(`${BASE_URL}/Solicitud_producto/${id}`);

};

//////Area//////
export const getArea = () => {
    axios.get(`${BASE_URL}/Area/`);
};

export const createArea = (data) => {
    axios.post(`${BASE_URL}/Area/`, data);
};

export const getDetailArea = (id) => {
    axios.get(`${BASE_URL}/Area/${id}`);
};

export const updateArea = (id,data) => {
    axios.put(`${BASE_URL}/Area/${id}`, data);
};

export const deleteArea = (id) => {
    axios.delete(`${BASE_URL}/Area/${id}`);
};

//////Trabajo//////
export const getTrabajo = () => {
    axios.get(`${BASE_URL}/Trabajo/`);
};

export const createTrabajo  = (data) => {
    axios.post(`${BASE_URL}/Trabajo/`, data);
};

export const getDetailTrabajo = (id) => {
    axios.get(`${BASE_URL}/Trabajo/${id}`);
};

export const updateTrabajo = (id,data) => {
    axios.put(`${BASE_URL}/Trabajo/${id}`, data);
};

export const deleteTrabajo = (id) => {
    axios.delete(`${BASE_URL}/Trabajo/${id}`);
};

//////Pedido//////
export const getPedido = () => {
    axios.get(`${BASE_URL}/Pedido/`);
};

export const createPedido = (data) => {
    axios.post(`${BASE_URL}/Pedido/`, data);
};

export const getDetailPedido = (id) => {
    axios.get(`${BASE_URL}/Pedido/${id}`);
};

export const updatePedido = (id,data) => {
    axios.put(`${BASE_URL}/Pedido/${id}`, data);
};

export const deletePedido = (id) => {
    axios.delete(`${BASE_URL}/Pedido/${id}`);
};

//////HistorialPedido//////
export const getHistorial_pedido = () => {
    axios.get(`${BASE_URL}/Historial_pedido/`);
};

export const createHistorial_pedido = (data) => {
    axios.post(`${BASE_URL}/Historial_pedido/`, data);
};

export const getDetailHistorial_pedido = (id) => {
    axios.get(`${BASE_URL}/Historial_pedido/${id}`);
};

export const updateHistorial_pedido = (id,data) => {
    axios.put(`${BASE_URL}/Historial_pedido/${id}`, data);
};

export const deleteHistorial_pedido = (id) => {
    axios.delete(`${BASE_URL}/Historial_pedido/${id}`);
};

//////ActualizarContraseña//////