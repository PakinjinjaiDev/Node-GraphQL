const mssql = require("../../config/mssql");

const combinedQuery = {
  combined: async ({ limit, page }) => {
    try {
      const offset = (page - 1) * limit;
      const [result] = await mssql.query(
        `SELECT * FROM ${process.env.COMBINED_TABLE} 
             ORDER BY month
             OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`
      );
      return result;
    } catch (error) {
      console.error("❌ Error fetching combined:", error);
      throw new Error("Failed to fetch combined data");
    }
  },
};

module.exports = combinedQuery;
