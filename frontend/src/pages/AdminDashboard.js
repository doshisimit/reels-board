// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    // Fetch users when the component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users'); // Replace with your backend route
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to handle user addition
    const handleAddUser = async () => {
        try {
            await axios.post('/api/admin/users', { username, password });
            setUsername('');
            setPassword('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to handle user editing
    const handleEditUser = async () => {
        try {
            await axios.put(`/api/admin/users/${editUserId}`, { username, password });
            setUsername('');
            setPassword('');
            setEditUserId(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Function to handle user deletion
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Set up fields for editing a user
    const initiateEdit = (user) => {
        setEditUserId(user._id);
        setUsername(user.username);
        setPassword('');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {editUserId ? (
                    <button onClick={handleEditUser}>Update User</button>
                ) : (
                    <button onClick={handleAddUser}>Add User</button>
                )}
            </div>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username}{' '}
                        <button onClick={() => initiateEdit(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
