import React from 'react';
import '../css/Register.css';
import logo from '../assets/images/TLogoWhite1.png';

const Register = () => {
    return(
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
                    <form>
                        <div className='form-grid'>
                            <div className='form-column'>
                                <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Paternal Surname</label>
                                    <input type="text" className="form-control" placeholder="Enter your surname" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Maternal Surname</label>
                                    <input type="text" className="form-control" placeholder="Enter your surname" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" placeholder="Enter your phone number" required />
                                </div>
                            </div>

                            <div className='form-column'>
                                <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Enter your email" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="Enter your address" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Zip Code</label>
                                    <input type="text" className="form-control" placeholder="Enter your address" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" placeholder="Enter your password" required />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Register
                        </button>

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