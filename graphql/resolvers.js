const User = require("../models/User");

const resolvers = {
  message: () => "Hello, GraphQL with graphql-http!",
  users: async () => {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      return [];
    }
  },
};

module.exports = resolvers;
