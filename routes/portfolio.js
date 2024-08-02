const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET all portfolio items
router.get('/', async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio items' });
    }
});

// GET a single portfolio item by ID
router.get('/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project details' });
    }
});

// POST a new portfolio item
router.post('/', async (req, res) => {
    try {
        const newPortfolio = new Portfolio(req.body);
        const savedPortfolio = await newPortfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error adding project' });
    }
});

// PUT update a portfolio item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPortfolio) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project' });
    }
});

// DELETE a portfolio item by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Portfolio.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
});

module.exports = router;
