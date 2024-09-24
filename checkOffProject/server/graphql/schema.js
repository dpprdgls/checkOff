const { gql } = require('apollo-server-express');

// This will serve as the entry point for your schema
const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = baseTypeDefs;