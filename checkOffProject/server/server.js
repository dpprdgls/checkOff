require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userRoutes = require('./routes/api/userRoutes');
const taskRoutes = require('./routes/api/taskRoutes');
const authRoutes= require('./routes/api/authRoutes');
const registerRoutes = require('./routes/api/registerRoutes');


// const authRouter = require('./routes/auth');

const app = express();

app.use(bodyParser.json());



//middleware to verify JWT token
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


