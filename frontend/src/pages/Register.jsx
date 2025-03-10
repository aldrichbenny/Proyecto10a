import React from 'react';
import '../css/Register.css';

const Register = () => {
    return(
        <div className='main-container'>
            <div className="sidenav">
                <div className="register-main-text">
                <img className='logo' src="https://placehold.co/300x200" alt="Logo" />
                <br/>
                <br />
                <h1>Register</h1>
                <p>Create account.</p>
                </div>
            </div>
            <div className="main">
            <div className="col-md-6 col-sm-12">
                <div className="register-form">
                    <form>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Enter your name" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Surname</label>
                            <input type="text" className="form-control" placeholder="Enter your surname" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" placeholder="Enter your address" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input type="tel" className="form-control" placeholder="Enter your phone number" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm your password" required />
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