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
      // 👉 ดึงจำนวนแถวทั้งหมดของ Table
      const [totalResult] = await mssql.query(
        `SELECT COUNT(*) AS count FROM ${process.env.COMBINED_TABLE};`
      );
    //   console.log(totalResult);
      
      const total_count = totalResult[0]?.count || 0;

      // คำนวณหน้าสุดท้าย
      const last_page = Math.ceil(total_count / limit);
    //   console.log(last_page);
      
      return {
        data: result,
        last_page: last_page,
        message: "success"
      };
    } catch (error) {
      console.error("❌ Error fetching combined:", error);
      throw new Error("Failed to fetch combined data");
    }
  },
};

module.exports = combinedQuery;
