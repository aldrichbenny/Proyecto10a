const API_URL = 'http://127.0.0.1:8000/api/Login/';

export const login = async (correo, contraseña) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en la autenticación');
        }

        return data;
    } catch (error) {
        console.error('Error en la autenticación:', error);
        throw new Error('Error al conectar con el servidor');
    }
};