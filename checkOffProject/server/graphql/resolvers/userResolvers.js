const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    me: async (_, __, { req }) => {
      const user = req.user;  // Get user from request context
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.userId);
    }
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists");
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);  // Debugging purposes
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
      console.log('User saved:', savedUser);  // Debugging purposes
      const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return { 
        token,
        user: { id: savedUser.id, username: savedUser.username, email: savedUser.email }
       };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");
      const isValid = await user.comparePassword(password);  // Fixed typo
      if (!isValid) throw new Error("Invalid credentials");
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return { ...user._doc, id: user.id, token };
    }
  }
};

module.exports = userResolvers;