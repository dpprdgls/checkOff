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

// Update a task for the logged-in user
exports.updateTask = async (req, res) => {
    const taskId = req.params.taskId; // Get the task ID from the request parameters
    const userId = req.user.id; // Get the logged-in user's ID from the request (set in the auth middleware)
  
    try {
      // Find the task by ID and ensure it belongs to the logged-in user
      const task = await Task.findOne({ _id: taskId, userId });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found or user not authorized' });
      }
  
      // Update the task fields with the data from the request body
      const { title, notes, itemsRequired, cost, category } = req.body;
  
      // Update the task object. Use the spread operator to maintain the existing fields.
      task.title = title !== undefined ? title : task.title; // Only update if provided
      task.notes = notes !== undefined ? notes : task.notes;
      task.itemsRequired = itemsRequired !== undefined ? itemsRequired : task.itemsRequired;
      task.cost = cost !== undefined ? cost : task.cost;
      task.category = category !== undefined ? category : task.category;
  
      // Validate the updated task before saving
      const validationError = task.validateSync();
      if (validationError) {
        console.error('Validation error:', validationError);
        return res.status(400).json({ message: 'Validation failed', error: validationError });
      }
  
      // Save the updated task
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Failed to update task', error });
    }
  };


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = req.user.id; // Assuming `req.user.id` is set by your auth middleware
        console.log("Attempting to delete task with ID:", taskId, "for user:", userId);

        // Find the task by _id and userId
        const task = await Task.findOne({ _id: taskId, userId });

        if (!task) {
            console.log("Task not found or user not authorized"); // Log if task not found

            return res.status(404).json({ message: 'Task not found or user not authorized' });
        }

        // Remove the task
        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task', error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};
