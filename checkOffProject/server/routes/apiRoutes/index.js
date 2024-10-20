const router = require('express').Router();

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
// const userRoutes = require('./userRoutes');
const registerRoutes = require('./registerRoutes');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
// router.use('/users', userRoutes);
router.use('/register', registerRoutes);


module.exports = router;