const { gql } = require("graphql-tag");

module.exports = gql`
  type Query {
    message: String
  }

  type Mutation
`;
