import React, { useState } from 'react';
import { registerUserAndProfile } from '../api/register';
import '../css/Register.css';
import logo from '../assets/images/TLogoWhite1.png';

const Register = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPat, setApellidoPat] = useState('');
    const [apellidoMat, setApellidoMat] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUserAndProfile(
                { correo, contraseña }, 
                { nombre, apellido_pat: apellidoPat, apellido_mat: apellidoMat, telefono, direccion } 
            );
            setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
            setError('');
            // Redirect to login after successful registration
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            try {
                const errorObj = JSON.parse(error.message);
                if (typeof errorObj === 'object') {
                    const errorMessages = Object.entries(errorObj)
                        .map(([field, msg]) => `${field}: ${msg}`)
                        .join('\n');
                    setError(errorMessages);
                } else {
                    setError(error.message);
                }
            } catch {
                setError(error.message);
            }
            setSuccess('');
        }
    };

    return (
        <div className='main-container'>
            <div className="sidenav">
                <div className="register-main-text">
                    <img className='logo' src={logo} height="300px" width="500px" alt="Logo" />
                </div>
            </div>
            <div className="main">
                <div className="col-md-6">
                    <div className="register-form">
                        <h1>Register</h1>
                        <p>Create account.</p>
                        <form onSubmit={handleRegister}>
                            <div className='form-grid'>
                                <div className='form-column'>
                                    <div className="form-group">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder="Enter your name" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Maternal Surname</label>
                                        <input type="text" className="form-control" placeholder="Enter your surname" value={apellidoMat} onChange={(e) => setApellidoMat(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <input type="tel" className="form-control" placeholder="Enter your phone number" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter your password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className="form-group">
                                        <label className="form-label">Paternal Surname</label>
                                        <input type="text" className="form-control" placeholder="Enter your surname" value={apellidoPat} onChange={(e) => setApellidoPat(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="Enter your email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" placeholder="Enter your address" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            <div className="text-center mt-3">
                                <span className="text-muted">Already have an account? </span>
                                <a href="/" className="fw-bold text-decoration-none">
                                    <em>Login now</em>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;