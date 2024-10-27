// AdminPortal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPortal = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
    };

    const handleAddUser = async () => {
        await axios.post('/api/admin/users', { username, password });
        fetchUsers();
    };

    const handleDeleteUser = async (userId) => {
        await axios.delete(`/api/admin/users/${userId}`);
        fetchUsers();
    };

    return (
        <div>
            <h2>Admin Portal</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAddUser}>Add User</button>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPortal;
