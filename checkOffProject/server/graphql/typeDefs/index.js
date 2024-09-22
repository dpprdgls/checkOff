const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');

const typeDefs = gql`
  ${userTypeDefs}
  `;

  module.exports = typeDefs;
  