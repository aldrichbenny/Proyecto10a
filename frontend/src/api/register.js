const API_URL = 'http://127.0.0.1:8000/api/Usuario/';
const API_URL2 = 'http://127.0.0.1:8000/api/Perfil/';

export const registerUserAndProfile = async (userData, profileData) => {
    try {
        const userResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo: userData.correo,
                contraseña: userData.contraseña,
                id_rol: 1, 
            }),
        });

        if (!userResponse.ok) {
            throw new Error('Error al registrar el usuario.');
        }

        const userDataResponse = await userResponse.json();
        const userId = userDataResponse.id_usuario; 

        console.log('Usuario creado:', userDataResponse);

        const profileResponse = await fetch(API_URL2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...profileData,
                id_usuario: userId,
            }),
        });

        if (!profileResponse.ok) {
            throw new Error('Error al registrar el perfil.');
        }

        const profileDataResponse = await profileResponse.json();
        console.log('Perfil creado:', profileDataResponse);

        return { userDataResponse, profileDataResponse };
    } catch (error) {
        console.error('Error en el registro:', error);
        throw new Error('Error al registrar el usuario y el perfil.');
    }
};
