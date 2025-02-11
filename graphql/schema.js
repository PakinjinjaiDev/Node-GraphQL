const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    message: String
    users: [User]
  }

  type User {
    id: ID
    name: String
    email: String
  }
`);

module.exports = schema;
