const mssql = require("../../config/mssql");

const ibcbttQuery = {
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
  },
};

module.exports = ibcbttQuery;
