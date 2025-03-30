export const API_URL = "http://127.0.0.1:8000/api/Perfil/";

export const obtenerPerfil = async () => {
    try {
        const usuarioData = localStorage.getItem("user");
        if (!usuarioData) {
            console.error("No hay usuario en localStorage");
            return null;
        }

        const usuario = JSON.parse(usuarioData);
        const idUsuario = usuario.id_usuario;

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();

        const perfilEncontrado = data.find((perfil) => perfil.id_usuario === idUsuario);

        if (!perfilEncontrado) {
            console.error("Perfil no encontrado");
            return null;
        }

        return perfilEncontrado;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        return null;
    }
};
