require('dotenv').config();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// // Register a new user
// exports.registerUser = async (req, res) => {
//     const { email, username, password } = req.body;
  
//     try {
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
  
//       // Hash the password before saving it
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log('Hashed password:', hashedPassword);
//       console.log('password normal', password);
//       // Create a new user
//       const newUser = new User({
//         email,
//         username,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
  
//       // Create JWT token
//       const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       res.status(201).json({ token, user: { id: newUser._id, email: newUser.email, username: newUser.username } });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };

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
  
  // Login an existing user
//   exports.loginUser = async (req, res) => {
//     const { email } = req.body;
//     const passwordString = String(req.body.password).trim();
//     console.log('Login attempt:', email, passwordString);
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
//       console.log('User found:', user);
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//         const hashedInputPassword = await bcrypt.hash(passwordString, 10);
//         console.log('Hashed input password:', hashedInputPassword);
//         console.log('Stored hashed password:', user.password);

//     // Compare the manually hashed password with the stored password
//         const isMatch = hashedInputPassword === user.password;
//         console.log('Password match:', isMatch);

  
//       // Compare the passwords
//       const isMatch = bcrypt.compareSync(passwordString, user.password);
//       const plainPass = 'password4';
//       const hashPass = '$2b$10$f6GWIAjNF0gQ.lHOApOIkeU0xfxigVc2q1/zYRi0CPNkwJBv4MN8y';
//       const isMatch2 = bcrypt.compareSync(plainPass, hashPass);
//       console.log('manal compare', isMatch2);
//       console.log('Password match:', isMatch);
//       console.log('passwordString', passwordString);
//       console.log('hashed password', user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Create a token
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       res.status(200).json({ token, message: 'Login successful' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };

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