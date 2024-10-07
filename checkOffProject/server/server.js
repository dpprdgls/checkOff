const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Your API routes go here, for example:
app.use('/api', require('./routes/apiRoutes')); // Add authentication routes
// app.use('/api/tasks', require('./routes/taskRoutes')); // Add other routes

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle all GET requests by serving React's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});