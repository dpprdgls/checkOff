require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Your user model


const { registerUser, loginUser } = require('../../controllers/userController.js');


router.post('/register', registerUser);
router.post('/login', loginUser);





module.exports = router;