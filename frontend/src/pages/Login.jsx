import React from 'react';
import '../css/Login.css';
import logo from '../assets/images/TLogoWhite1.png';

const Login = () => {
    return(
        <div className='main-container'>
            <div className="sidenav">
                <div className="login-main-text">
                <img className='logo' src={logo} height="300px" width="500px" alt="Logo" />
                <br/>
                <br />
                <h1>Login</h1>
                <p>Login from here to access.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                <div className="login-form">
                    <form>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="User Name" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn"  class="btn btn-primary">Login</button>
                        <div className="text-center mt-3">
                            <span className="text-muted">New User? </span>
                            <a href="/register" className="fw-bold text-decoration-none">
                                <em>Create an account</em>
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