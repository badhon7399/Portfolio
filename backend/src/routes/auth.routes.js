const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');

// Validation middleware
const validateRegister = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
];

// Routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router; 