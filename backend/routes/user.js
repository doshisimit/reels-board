const express = require('express');
const { addReel } = require('../controllers/userController');
const router = express.Router();

// Middleware for protecting routes, placeholder for now
const authMiddleware = (req, res, next) => { /* Token validation logic */ next(); };

router.post('/reel', authMiddleware, addReel);
module.exports = router;
