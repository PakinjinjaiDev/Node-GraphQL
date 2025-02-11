const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

module.exports = createHandler({
  schema,
  rootValue: resolvers,
});
