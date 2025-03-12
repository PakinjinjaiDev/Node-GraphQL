const User = require("../../models/User");

const queryResolvers = {
  message: () => "Hello, GraphQL with graphql-http!",
};

module.exports = queryResolvers;
