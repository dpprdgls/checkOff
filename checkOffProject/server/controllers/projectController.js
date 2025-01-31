require('dotenv').config();
const Project = require('../models/Projects');
const Task = require('../models/Task'); // Import the Task model if needed for task management

// Fetch projects specific to the logged-in user
exports.getAllProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch projects that belong to the logged-in user, and populate associated tasks
    const projects = await Project.find({ userId }).populate('tasks');

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects.', error: err });
  }
};

// Create a new project for the logged-in user
exports.createProject = async (req, res) => {
  const { name, description, tasks } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      tasks: tasks || [], // Initialize tasks as an empty array if none are provided
      userId: req.user.id
    });

    const validationError = newProject.validateSync();
    if (validationError) {
      return res.status(400).json({ message: 'Validation failed', error: validationError });
    }

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project!', error });
  }
};

// controllers/projectController.js

exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const updatedData = req.body;

  try {
    const project = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};


// Add a task to an existing project
exports.addTaskToProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { taskId } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or user not authorized' });
    }

    if (!project.tasks.includes(taskId)) {
      project.tasks.push(taskId);
    }

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task to project', error });
  }
};

// Remove a task from a project
exports.removeTaskFromProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { taskId } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or user not authorized' });
    }

    project.tasks = project.tasks.filter(task => task.toString() !== taskId);
    await project.save();

    res.status(200).json({ message: 'Task removed from project', project });
  } catch (error) {
    res.status(500).json({ message: 'Error removing task from project', error });
  }
};

// Delete a project and optionally all associated tasks
exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findOne({ _id: projectId, userId: req.user.id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or user not authorized' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};