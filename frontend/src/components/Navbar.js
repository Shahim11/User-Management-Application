import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');  
    const username = localStorage.getItem('username'); 

    const handleLogout = () => {
        localStorage.clear();  
        navigate('/'); 
    };

    return (
        <nav className="navbar mb-3 px-3" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Link className="navbar-brand" to="/">User Management</Link> 
                <div className="d-flex align-items-center">
                    <Link className="nav-item nav-link me-4" to="/">Home</Link>  
                    {token && (
                        <div className="d-flex align-items-center">
                            <span className="me-4">Hello, 
                                <Link to="/admin" className="ms-1" style={{ textDecoration: 'none' }}> 
                                    {username}
                                </Link>
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}