const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    message: String
    users: [User]
  }

  type User {
    id: String
    name: String
    email: String
  }
`);

module.exports = schema;
