const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');

const typeDefs = gql`
  ${userTypeDefs},
  ${taskTypeDefs}
  `;

  module.exports = typeDefs;
