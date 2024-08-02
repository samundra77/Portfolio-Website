const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
