export async function getSolicitudes() {
    return await fetch('http://127.0.0.1:8000/api/Solicitud', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getDetalleSolicitud(id_solicitud) {
    return await fetch('http://127.0.0.1:8000/api/Solicitud/' + id_solicitud, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getDetalleSolicitudProducto(id_solicitud){
    return await fetch('http://127.0.0.1:8000/api/Solicitud_producto/solicitud/' + id_solicitud, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function addPedido(pedido){
    return await fetch('http://127.0.0.1:8000/api/Pedido/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(pedido),
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getPedidos() {
    return await fetch('http://127.0.0.1:8000/api/Pedido', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getDetallePedido(id_pedido) {
    return await fetch('http://127.0.0.1:8000/api/Pedido/' + id_pedido, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getDetallePerfilUsuario(id_usuario) {
    return await fetch('http://127.0.0.1:8000/api/Perfil/' + id_usuario, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function getHistorialPedido(id_pedido) {
    return await fetch('http://127.0.0.1:8000/api/Historial_pedido/' + id_pedido, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function updateSolicitudStatus(id_solicitud, data) {
    return await fetch(`http://127.0.0.1:8000/api/Solicitud/${id_solicitud}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}

export async function updatePedidoStatus(id_pedido, data) {
    return await fetch(`http://127.0.0.1:8000/api/Pedido/${id_pedido}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            return 'Error en el servidor';
        });
}