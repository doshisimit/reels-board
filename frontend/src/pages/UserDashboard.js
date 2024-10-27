// src/pages/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [reels, setReels] = useState([]);
    const [reelURL, setReelURL] = useState('');
    const [productLink, setProductLink] = useState('');
    const [editReelId, setEditReelId] = useState(null);
    const [view, setView] = useState('list'); // Toggle between list and grid views

    // Fetch reels when the component loads
    useEffect(() => {
        fetchReels();
    }, []);

    // Function to fetch user reels
    const fetchReels = async () => {
        try {
            const response = await axios.get('/api/user/reels'); // Replace with your backend route
            setReels(response.data);
        } catch (error) {
            console.error('Error fetching reels:', error);
        }
    };

    // Function to handle reel addition
    const handleAddReel = async () => {
        try {
            await axios.post('/api/user/reel', { url: reelURL, productLink });
            setReelURL('');
            setProductLink('');
            fetchReels();
        } catch (error) {
            console.error('Error adding reel:', error);
        }
    };

    // Function to handle reel editing
    const handleEditReel = async () => {
        try {
            await axios.put(`/api/user/reel/${editReelId}`, { url: reelURL, productLink });
            setReelURL('');
            setProductLink('');
            setEditReelId(null);
            fetchReels();
        } catch (error) {
            console.error('Error updating reel:', error);
        }
    };

    // Function to handle reel deletion
    const handleDeleteReel = async (reelId) => {
        try {
            await axios.delete(`/api/user/reel/${reelId}`);
            fetchReels();
        } catch (error) {
            console.error('Error deleting reel:', error);
        }
    };

    // Set fields to edit a reel
    const initiateEdit = (reel) => {
        setEditReelId(reel._id);
        setReelURL(reel.url);
        setProductLink(reel.productLink);
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <div>
                <input
                    type="text"
                    placeholder="Reel URL"
                    value={reelURL}
                    onChange={(e) => setReelURL(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Product Link"
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                />
                {editReelId ? (
                    <button onClick={handleEditReel}>Update Reel</button>
                ) : (
                    <button onClick={handleAddReel}>Add Reel</button>
                )}
            </div>

            <button onClick={() => setView(view === 'list' ? 'grid' : 'list')}>
                Toggle to {view === 'list' ? 'Grid' : 'List'} View
            </button>

            <div className={view}>
                {reels.map((reel) => (
                    <div key={reel._id} className="reel-item">
                        <iframe src={reel.url} title="Reel Preview"></iframe>
                        <a href={reel.productLink} target="_blank" rel="noopener noreferrer">
                            Visit Product
                        </a>
                        <button onClick={() => initiateEdit(reel)}>Edit</button>
                        <button onClick={() => handleDeleteReel(reel._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
