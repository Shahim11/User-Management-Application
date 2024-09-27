import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';  
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });  
            localStorage.setItem('token', response.data.token);  
            localStorage.setItem('username', response.data.username);  
            navigate('/admin');  
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className='container mt-5 pt-5'>
            <div className='row justify-content-md-center'>
                <div className='col-md-auto border rounded-3 p-5 m-3 bg-secondary-subtle text-center'>
                    <h2 className="mb-5">Login</h2>
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 text-start">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            
                            <div className="form-group mb-4 text-start">
                                <label>Password</label>
                                <div className="input-group">
                                    <input type={showPassword ? 'text' : 'password'}  
                                        className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    />
                                    <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}  
                                    </span>
                                </div>
                            </div>

                            <div className='d-grid gap-2 mx-3'>
                                <button type="submit" className="btn btn-primary mt-2">Login</button>
                                <span className='my-1'>or</span>
                                <Link to="/register" className="btn btn-secondary">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}