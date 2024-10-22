require('dotenv').config();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// Register a new user
exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user (password hashing is handled by the model)
      const newUser = new User({
        email,
        username,
        password,
      });
  
      await newUser.save();
  
      // Create JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user: { id: newUser._id, email: newUser.email, username: newUser.username } });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Use the model method to compare passwords
      const isMatch = await user.isCorrectPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ 
        token, 
        user: { id: user._id, email: user.email, name: user.name } // Include user object in the response
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };