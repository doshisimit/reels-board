const mongoose = require('mongoose');
const reelSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    productLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Reel', reelSchema);
