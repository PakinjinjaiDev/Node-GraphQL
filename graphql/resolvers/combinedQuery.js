const mssql = require("../../config/mssql");
const { parseResolveInfo } = require("graphql-parse-resolve-info"); // ✅ ต้องติดตั้ง: npm install graphql-parse-resolve-info

const combinedQuery = {
  combined: async ({ limit, page }, context, info) => {
    try {
      const offset = (page - 1) * limit;
      // ✅ 1. ดึงเฉพาะฟิลด์ที่ผู้ใช้ร้องขอ จาก info
      const parsedInfo = parseResolveInfo(info);
      const fieldsRequested = parsedInfo.fieldsByTypeName.CombinedResponse.data.fieldsByTypeName.comBined;
      const selectedFields = Object.keys(fieldsRequested);
      const selectedFieldSQL = selectedFields.map(field => `[${field}]`).join(", ");
      // ✅ 2. Query เฉพาะฟิลด์ที่ผู้ใช้ร้องขอ
      const [result] = await mssql.query(
        `SELECT ${selectedFieldSQL} FROM ${process.env.COMBINED_TABLE}
         ORDER BY month
         OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`
      );
      // ✅ 3. Query count ทั้งหมด
      const [totalResult] = await mssql.query(
        `SELECT COUNT(*) AS count FROM ${process.env.COMBINED_TABLE};`
      );
      const total_count = totalResult[0]?.count || 0;
      const last_page = Math.ceil(total_count / limit);
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
