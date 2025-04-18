const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { auth, admin } = require('../middleware/auth.middleware');

// Public routes
router.get('/', projectController.getProjects);
router.get('/featured', projectController.getFeaturedProjects);
router.get('/:id', projectController.getProject);

// Protected routes (admin only)
router.post('/', auth, admin, projectController.createProject);
router.put('/:id', auth, admin, projectController.updateProject);
router.delete('/:id', auth, admin, projectController.deleteProject);

module.exports = router; 