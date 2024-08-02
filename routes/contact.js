const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Handle contact form submission
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
});

module.exports = router;
