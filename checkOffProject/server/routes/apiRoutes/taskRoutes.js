const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController');
const authMiddleware = require('../../middleware/auth');  // JWT auth middleware

// Get all tasks for the logged-in user
router.get('/tasks', authMiddleware, taskController.getAllTasks);

// Create a new task for the logged-in user
router.post('/tasks', authMiddleware, taskController.createTask);

router.delete('tasks/:id', authMiddleware, taskController.deleteTask);

router.put('/tasks/:taskId', authMiddleware, taskController.updateTask);


module.exports = router;