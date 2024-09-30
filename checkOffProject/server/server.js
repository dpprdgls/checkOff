require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/connection');


const userRoutes = require('./routes/apiRoutes/userRoutes');
const taskRoutes = require('./routes/apiRoutes/taskRoutes');
const authRoutes= require('./routes/apiRoutes/authRoutes');
const registerRoutes = require('./routes/apiRoutes/registerRoutes');




const app = express();

app.use(bodyParser.json());



//middleware to verify JWT token
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/register', registerRoutes);


connectDB();

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


