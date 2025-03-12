const User = require("../../models/User");


const userQuery = {
    users: async () => {
        try {
          return await User.findAll();
        } catch (error) {
          console.error("❌ Error fetching users:", error);
          throw new Error("Failed to fetch users");
        }
      },
};

module.exports = userQuery;