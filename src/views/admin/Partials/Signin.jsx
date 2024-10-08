
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Signin.css';

const Signin = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
       
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h1 className="mb-4 text-center">Login</h1>
                                <p className="text-secondary mb-4 text-center">Sign in to your account</p>
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        autoComplete="email" 
                                        required 
                                    />
                                </div>
                                <div className="mb-4 input-group">
                                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password" 
                                        autoComplete="current-password" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="rememberMe" 
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <button type="submit" className="btn btn-primary w-100">Login</button>
                                    </div>
                                    <div className="col-xs-6 text-end">
                                        <button type="button" className="btn btn-link forgot-password">Forgot password?</button>
                                    </div>
                                </div>
                            </form>
                            
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;