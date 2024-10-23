require('dotenv').config();
const Task = require('../models/Task');

// Fetch tasks specific to the logged-in user
exports.getAllTasks = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request (set in the auth middleware)
    const userId = req.user.id;

    // Fetch tasks that belong to the logged-in user
    const tasks = await Task.find({ userId: userId });  // Consistent field name

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks.', error: err });
  }
};

// Create a new task for the logged-in user
exports.createTask = async (req, res) => {
  const { title, notes, itemsRequired, cost, category } = req.body;

  try {
    // Create a new task with the logged-in user's ID
    const newTask = new Task({
      title,
      notes,
      itemsRequired,
      cost,
      category,
      userId: req.user.id  // Ensure the `userId` is being passed correctly from the JWT middleware
    });

    // Validate the new task before saving
    const validationError = newTask.validateSync();
    if (validationError) {
      console.error('Validation error:', validationError);
      return res.status(400).json({ message: 'Validation failed', error: validationError });
    }

    // Save the new task
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);  // Log the error to help debug
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.deleteTask = async (req, res) => {
    try {
    const taskId = req.params.taskId;
    const userId = req.user.id;

    const task = await Task.findById({ _id: taskId, userId });

    if (!task) {
        return res.status(404).json({ message: 'Task not found or user not found' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
}catch (error) {
    console.error('Error deleting task', error);
    res.status(500).json({ message: 'Error deleting task', error});
}
}
