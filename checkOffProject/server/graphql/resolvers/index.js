const userResolvers = require('./userResolvers');
const taskResolvers = require('./taskResolvers');

const resolvers = { 
    Query: {
        ...userResolvers.Query, 
        ...taskResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
         ...taskResolvers.Mutation,
    }
};

module.exports = resolvers;

