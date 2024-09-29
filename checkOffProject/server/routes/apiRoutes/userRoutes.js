const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

// POST route for user registration
router.post('/register', UserController.registerUser);

// POST route for user login
router.post('/login', UserController.loginUser);

module.exports = router;