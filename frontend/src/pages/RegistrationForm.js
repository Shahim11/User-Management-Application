import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/register', { name, email, password });  
            alert(response.data.message); 
            navigate('/');  
        } catch (error) {
            if (error.response && error.response.status) {
                alert(error.response.data.message);  
            } 
            else {
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='container text-center mt-5 pt-5'>
            <div className='row justify-content-md-center'>
                <div className='col-md-auto border rounded-4 p-5 m-3 bg-secondary-subtle'>
                    <h2 className="mb-5" style={{textAlign:'center'}}>Register</h2>
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 text-start">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
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
                                <button type="submit" className="btn btn-primary mt-2">Register</button>
                                <span className='my-1'>or</span>
                                <Link to="/login" className="btn btn-secondary">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}