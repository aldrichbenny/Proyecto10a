const API_URL_AREA = "http://127.0.0.1:8000/api/Area/";

export const obtenerAreaUsuario = async (idUsuario) => {
    try {
        const response = await fetch(API_URL_AREA);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();

        const areaEncontrada = data.find(area => area.id_usuario === idUsuario);

        return areaEncontrada ? areaEncontrada.nombre_area : "No asignado";
    } catch (error) {
        console.error("Error al obtener el área:", error);
        return "Error";
    }
};
