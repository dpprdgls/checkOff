const Task = require('../../models/Task');

const taskResolvers = {
  Query: {
    tasks: async (_, __, { req }) => {
      if (!req.user) throw new Error('Not authenticated');
      return await Task.find({ userId: req.user.userId });
    },
    task: async (_, { id }, { req }) => {
      if (!req.user) throw new Error('Not authenticated');
      return await Task.findById(id);
    }
  },
  Mutation: {
    createTask: async (_, { title, notes, itemsRequired, cost, category }, { req }) => {
      if (!req.user) throw new Error('Not authenticated');
      const newTask = new Task({
        title,
        notes,
        itemsRequired,
        cost,
        category,
        userId: req.user.userId
      });
      return await newTask.save();
    },
    deleteTask: async (_, { id }, { req }) => {
      if (!req.user) throw new Error('Not authenticated');
      return await Task.findByIdAndDelete(id);
    }
  }
};

module.exports = taskResolvers;