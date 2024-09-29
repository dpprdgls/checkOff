require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Your user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      user = new User({
        email,
        password: await bcrypt.hash(password, 10), // Hash password
        username,
      });
  
      await user.save();
  
      // Create JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;