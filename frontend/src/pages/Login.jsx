import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/login';
import '../css/Login.css';
import logo from '../assets/images/TLogoWhite1.png';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login(correo, contraseña);

            console.log('Usuario autenticado:', data);

            switch (data.detalle_id_rol?.nombre_rol) {
                case 'Customer':
                    navigate('/main');
                    break;
                case 'AreaManager':
                    navigate('/indexAR');
                    break;
                case 'Administrator':
                    navigate('/admin');
                    break;
                default:
                    setError('Rol desconocido');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return(
        <div className='main-container'>
            <div className="sidenav">
                <div className="login-main-text">
                <img className='logo' src={logo} height="300px" width="500px" alt="Logo" />
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p>Login from here to access.</p>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="text-center mt-3">
                        <span className="text-muted">¿New User? </span>
                        <a href="/register" className="fw-bold text-decoration-none">
                            <em>Create Account</em>
                        </a>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;