const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./index');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
