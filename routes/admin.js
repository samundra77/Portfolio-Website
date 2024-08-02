const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Ensure this model exists and is correctly defined

// Add a project
router.post('/add-project', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ message: 'Project added successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding project' });
    }
});

// Edit a project
router.put('/edit-project/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project updated successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating project' });
    }
});

// Delete a project
router.delete('/delete-project/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting project' });
    }
});

// Fetch all projects
router.get('/portfolio', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// Fetch a single project
router.get('/portfolio/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
});

module.exports = router;
