require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Your user model


const { registerUser, loginUser } = require('../../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);





module.exports = router;