// const express = require('express');
// const router = express.Router();
// const taskController = require('../../controllers/taskController.js');

// router.get('/', taskController.getAllTasks);

// // router.post('/', taskController.createTask);

// router.post('/create', createTask);

// module.exports = router;

//test22222

// const express = require('express');
// const router = express.Router();
// const Task = require('../../models/Task'); // Your Task model
// const authMiddleware = require('../../middleware/auth'); // JWT auth middleware

// // Get all tasks for a specific user
// router.get('/:userId/tasks', authMiddleware, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.params.userId });
//     if (!tasks) {
//       return res.status(404).json({ message: 'No tasks found' });
//     }
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');  // Your Task model
const authMiddleware = require('../../middleware/auth.js');  // JWT auth middleware

// Get all tasks for a specific user
router.get('/:userId/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new task for the logged-in user
router.post('/:userId/tasks', authMiddleware, async (req, res) => {
  const { title, notes, itemsRequired, cost, category } = req.body;

  try {
    const newTask = new Task({
      title,
      notes,
      itemsRequired,
      cost,
      category,
      userId: req.params.userId,  // Associate task with the user
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

module.exports = router;
