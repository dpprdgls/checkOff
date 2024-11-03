const router = require('express').Router();

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const registerRoutes = require('./registerRoutes');
const projectRoutes = require('./projectRoutes');


router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/register', registerRoutes);
router.use('/projects', projectRoutes);



module.exports = router;