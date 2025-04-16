const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    id: String
    name: String
    email: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): String
  }
`;
