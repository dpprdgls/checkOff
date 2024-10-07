const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController.js');

router.get('/', taskController.getAllTasks);

// router.post('/', taskController.createTask);

router.post('/create', createTask);

module.exports = router;