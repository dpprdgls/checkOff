const Task = require('../models/Task');

// Fetch tasks specific to the logged-in user
exports.getAllTasks = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request (set in the auth middleware)
        const userId = req.user.id;

        // Fetch tasks that belong to the logged-in user
        const tasks = await Task.find({ user: userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tasks.', error: err });
    }
};

// Create a new task for the logged-in user
exports.createTask = async (req, res) => {
    const userId = req.user.id;  // Get the logged-in user's ID from the request

    const task = new Task({
        title: req.body.title,
        notes: req.body.notes,
        itemsRequired: req.body.itemsRequired,
        cost: req.body.cost,
        category: req.body.category,
        user: userId  // Associate the task with the logged-in user
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task.', error: err });
    }
};
