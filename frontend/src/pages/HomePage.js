import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const token = localStorage.getItem('token'); 

    return (
        <div className="container text-center mt-5">
            <h1 className='mt-3'>Welcome to the User Management Application</h1>
            <p className='mt-5'>This application allows you to manage users, including registration, login, and administrative functions like Block, Unblock and Delete.</p>
            {!token && (  // Only show buttons if the user is not logged in
                <><p className='mt-5'>Please Register or Login to continue.</p>
                <div className='mt-5'>
                    <Link to="/register" className="btn btn-primary mx-2">Register</Link>
                    <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
                </div></>
            )}          
        </div>
    );
}