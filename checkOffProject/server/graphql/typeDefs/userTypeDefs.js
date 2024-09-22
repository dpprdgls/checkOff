const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    }
    
    type Query {
    users: [User]
    user(id: ID!): User
    me: User
    }
    
    type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    }
    `;

module.exports = userTypeDefs;