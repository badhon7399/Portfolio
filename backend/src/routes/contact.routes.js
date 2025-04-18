const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contact.controller');
const { auth, admin } = require('../middleware/auth.middleware');

// Validation middleware
const validateMessage = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
];

// Public routes
router.post('/', validateMessage, contactController.sendMessage);

// Protected routes (admin only)
router.get('/', auth, admin, contactController.getMessages);
router.put('/:id/status', auth, admin, contactController.updateMessageStatus);

module.exports = router; 