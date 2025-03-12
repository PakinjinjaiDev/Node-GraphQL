const User = require("../../models/User");

const userMutation = {
  createUser: async ({ name, email }) => {
    try {
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
  updateUser: async ({ id, name, email }) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (name) user.name = name;
      if (email) user.email = email;
      await user.save();
      return user;
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw new Error("Failed to update user");
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return `User with ID ${id} deleted successfully`;
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
};

module.exports = userMutation;
