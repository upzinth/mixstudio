const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all projects (Admin) or User's projects
// @route   GET /api/projects
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let projects;
        if (req.user.role === 'admin') {
            projects = await Project.find({}).populate('client', 'username email');
        } else {
            projects = await Project.find({ client: req.user._id });
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
    const { title, artist, description, deadline } = req.body;

    try {
        const project = new Project({
            title,
            artist,
            description,
            deadline,
            client: req.user._id, // Assign to current user
            status: 'pending'
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Allow if admin or project owner
            if (req.user.role === 'admin' || project.client.toString() === req.user._id.toString()) {
                res.json(project);
            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
