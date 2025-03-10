const User = require("../models/User");
const mssql = require("../config/mssql"); // เชื่อมต่อกับ MSSQL

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
  // Mutation สำหรับสร้าง User ✅
  createUser: async ({ name, email }) => {
    try {
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
  // Mutation สำหรับอัปเดตข้อมูล User ✅
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
  // Mutation สำหรับลบ User ✅
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
  },
  combined: async ({ limit, page }) => {
    try {
      const offset = (page - 1) * limit;
      const [result] = await mssql.query(`
        SELECT * FROM ${process.env.COMBINED_TABLE} 
        ORDER BY month
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
      `);
      return result;
    } catch (error) {
      console.error("❌ Error fetching comBined:", error);
      return [];
    }
  },
  idc_btt: async ({ limit, page }) => {
    try {
      const offset = (page - 1) * limit;
      const [result] = await mssql.query(`
        SELECT id, 
               device_name,
               unit, 
               CAST(unixtime AS VARCHAR) AS unixtime,
               time, value
        FROM ${process.env.IDC_BTT_TABLE} 
        ORDER BY id
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
      `);
      return result;
    } catch (error) {
      console.error("❌ Error fetching IDC_BTT:", error);
      return [];
    }
  }
};

module.exports = resolvers;
