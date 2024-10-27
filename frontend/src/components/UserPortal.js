// UserPortal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPortal = () => {
    const [reels, setReels] = useState([]);
    const [reelURL, setReelURL] = useState('');
    const [productLink, setProductLink] = useState('');
    const [view, setView] = useState('list'); // For toggling between list/grid views

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        const response = await axios.get('/api/user/reels');
        setReels(response.data);
    };

    const handleAddReel = async () => {
        await axios.post('/api/user/reel', { url: reelURL, productLink });
        fetchReels();
    };

    const handleDeleteReel = async (reelId) => {
        await axios.delete(`/api/user/reel/${reelId}`);
        fetchReels();
    };

    return (
        <div>
            <h2>User Portal</h2>
            <input placeholder="Reel URL" value={reelURL} onChange={(e) => setReelURL(e.target.value)} />
            <input placeholder="Product Link" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
            <button onClick={handleAddReel}>Add Reel</button>

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
                        <button onClick={() => handleDeleteReel(reel._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPortal;
