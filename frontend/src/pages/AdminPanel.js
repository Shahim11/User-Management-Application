import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';  
import { FaTrash, FaLockOpen , FaLock  } from 'react-icons/fa'; 

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');  
            return;
        }
        api.get('/api/users/users', {
            headers: { Authorization: token }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');  
            }
        });
    }, [navigate]);

    const handleSelect = (id) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleBlock = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/block', { ids: selectedIds }, {
                headers: { Authorization: token }
            });
    
            alert(response.data.message); 
    
            if (response.data.currentUserBlocked) {
                localStorage.removeItem('token'); 
                navigate('/'); 
            } else {       
                fetchUsers();  
                setSelectedIds([]);  
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Error Blocking user. Please try again.');
            }
            setSelectedIds([]);
        }
    };
    
    const handleUnblock = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/unblock', { ids: selectedIds }, {
                headers: { Authorization: token }
            });
            
            alert(response.data.message); 
            fetchUsers();  
            setSelectedIds([]); 
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Error Unblocking user. Please try again.');
            }
            setSelectedIds([]);
        } 
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/delete', { ids: selectedIds }, {
                headers: { Authorization: token }
            });

            alert(response.data.message); 
    
            if (response.data.currentUserDeleted) {
                localStorage.removeItem('token'); 
                navigate('/'); 
            } else {
                fetchUsers();  
            }
        } catch (error) {
            alert('Error Deleting user. Please try again.');
        }
    };

    const fetchUsers = () => {
        const token = localStorage.getItem('token');
        api.get('/api/users/users', {
            headers: { Authorization: token }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        });
    };

    const isAllSelected = users.length > 0 && selectedIds.length === users.length;

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(users.map(user => user.id));  
        } else {
            setSelectedIds([]);  
        }
    };
    
    return (
        <div className='px-4 mx-4'>
            <div className="d-flex justify-content-between mb-3">
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group me-2" role="group">
                        <button onClick={handleBlock} className="btn btn-danger d-flex align-items-center">
                            <FaLock className="me-1" /> <span> Block</span>  
                        </button>
                    </div>
                    <div className="btn-group me-2" role="group">
                        <button onClick={handleUnblock} className="btn btn-secondary">
                            <FaLockOpen /> 
                        </button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={handleDelete} className="btn btn-danger">
                            <FaTrash /> 
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive rounded-2">
                <table className="table table-hover table-light table-striped">
                    <thead class="table-primary">
                        <tr>
                            <th>
                                <input 
                                    type="checkbox" 
                                    checked={isAllSelected} 
                                    onChange={handleSelectAll} 
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last Login Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => handleSelect(user.id)} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.last_login_time).toLocaleString()}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </div>
    );
}