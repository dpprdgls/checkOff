const { gql } = require('apollo-server-express');

const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    notes: String
    itemsRequired: [String]
    cost: Float
    category: String
    createdAt: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, notes: String, itemsRequired: [String], cost: Float, category: String): Task
    deleteTask(id: ID!): Task
  }
`;

module.exports = taskTypeDefs; 