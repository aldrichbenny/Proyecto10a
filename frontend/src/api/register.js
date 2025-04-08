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

        const responseData = await userResponse.json();
        
        if (!userResponse.ok) {
            if (responseData.error) {
                throw new Error(JSON.stringify(responseData.error));
            }
            throw new Error('Error al registrar el usuario.');
        }

        const userId = responseData.id_usuario; 
        console.log('Usuario creado:', responseData);

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

        const profileResponseData = await profileResponse.json();
        
        if (!profileResponse.ok) {
            if (profileResponseData.error) {
                throw new Error(JSON.stringify(profileResponseData.error));
            }
            throw new Error('Error al registrar el perfil.');
        }

        console.log('Perfil creado:', profileResponseData);
        return { user: responseData, profile: profileResponseData };
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
};
