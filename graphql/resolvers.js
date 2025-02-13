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
  combined: async ({ limit , page }) => {
    try {
      const offset =  (page - 1) * limit;
      const [ result ] = await mssql.query(`
        SELECT * FROM ${process.env.COMBINED_TABLE} 
        ORDER BY month DESC
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`)
      return result;
      // return await comBined.findAll();
    } catch (error) {
      console.error("❌ Error fetching comBined:", error);
      return [];
    }
  }
};

module.exports = resolvers;
