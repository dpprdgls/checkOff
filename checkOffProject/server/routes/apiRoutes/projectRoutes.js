const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectController');
const authMiddleware = require('../../middleware/auth');  // JWT auth middleware


router.get('/', authMiddleware, projectController.getAllProjects);

router.post('/', authMiddleware, projectController.createProject);

router.put('/:projectId', authMiddleware, projectController.updateProject);

router.delete('/:projectId/tasks', authMiddleware, projectController.removeTaskFromProject);

router.delete('/:projectId', authMiddleware, projectController.deleteProject);



module.exports = router;