const queryResolvers = require("./resolvers/queryResolvers");
const userMutation = require('./resolvers/userMutations');
const userQuery = require("./resolvers/userQuery");
const combinedQuery = require("./resolvers/combinedQuery");
const ibcbttQuery = require("./resolvers/ibcbttQuery");

const resolvers = {
  ...queryResolvers,
  ...userQuery,
  ...ibcbttQuery,
  ...combinedQuery,
  ...userMutation,
};

module.exports = resolvers;
