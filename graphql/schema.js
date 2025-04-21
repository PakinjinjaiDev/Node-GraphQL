const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./index_typedefs');
const resolvers = require('./index_resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
