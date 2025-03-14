const User = require("../../models/User");
const { GraphQLError } = require("graphql");

const userMutation = {
  createUser: async ({ name, email }) => {
    try {
      // ✅ Trim ค่า input
      name = name.trim();
      email = email.trim();
      // ✅ ตรวจสอบว่า name และ email ห้ามเป็นค่าว่าง
      if (!name || !email) {
        throw new GraphQLError("Name and email cannot be empty.");
      }
      // ✅ ตรวจสอบว่า email ซ้ำหรือไม่
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new GraphQLError("Email already exists in the system.");
      }
      // ✅ ถ้าผ่านเงื่อนไขทั้งหมด ให้สร้าง user ใหม่
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      // console.error("❌ Error creating user:", error);
      throw new GraphQLError(error.message); // ✅ ส่ง message อย่างเดียว
    }
  },
  updateUser: async ({ id, name, email }) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new GraphQLError("User not found.");
      }
      if (name) {
        name = name.trim();
        if (!name) throw new GraphQLError("Name cannot be empty.");
        user.name = name;
      }
      if (email) {
        email = email.trim();
        if (!email) throw new GraphQLError("Email cannot be empty.");
        // ✅ ตรวจสอบ email ซ้ำ
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== id) {
          throw new GraphQLError("Email already exists in the system.");
        }
        user.email = email;
      }
      await user.save();
      return user;
    } catch (error) {
      // console.error("❌ Error updating user:", error);
      throw new GraphQLError(error.message);
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new GraphQLError("User not found.");
      }
      await user.destroy();
      return `User with ID ${id} deleted successfully`;
    } catch (error) {
      // console.error("❌ Error deleting user:", error);
      throw new GraphQLError(error.message);
    }
  }
};

module.exports = userMutation;
