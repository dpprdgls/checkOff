const Task = require('../models/Task');


//fetch all tasks
exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.Find();
      res.json(tasks);
    } catch (err) {
     res.status(500).json({ message: 'Error retrieving tasks.', error: err });
    }
};

//create new task
exports.createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        notes: req.body.notes,
        itemsRequired: req.body.itemsRequired,
        cost: req.body.cost,
        category: req.body.category
});
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
     res.status(400).json({ message: 'Error creating task.', error: err });
    }
};



