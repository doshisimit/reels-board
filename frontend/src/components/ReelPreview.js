// ReelPreview.js
import React from 'react';

const ReelPreview = ({ url, productLink }) => (
    <div>
        <iframe src={url} title="Reel Preview" style={{ width: '100%', height: '400px' }}></iframe>
        <a href={productLink} target="_blank" rel="noopener noreferrer">
            Visit Product
        </a>
    </div>
);

export default ReelPreview;
