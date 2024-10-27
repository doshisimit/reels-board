// NonUserPortal.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NonUserPortal = () => {
    const { username } = useParams();
    const [reels, setReels] = useState([]);
    const [view, setView] = useState('list');

    useEffect(() => {
        fetchUserReels();
    }, [username]);

    const fetchUserReels = async () => {
        const response = await axios.get(`/api/public/${username}`);
        setReels(response.data);
    };

    return (
        <div>
            <h2>{username}'s Reels</h2>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NonUserPortal;
