const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]!
    me: User
  }

  type AuthPayload {
    token: String!
    user: User
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = userTypeDefs;