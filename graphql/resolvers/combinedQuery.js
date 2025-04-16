const mssql = require("../../config/mssql");
const { parseResolveInfo } = require("graphql-parse-resolve-info");

const combinedQuery = {
  Query: {
    combined: async (parent, args, context, info) => {
      const { limit, page } = args;
      const offset = (page - 1) * limit;
      const parsedInfo = parseResolveInfo(info);
      const fieldsRequested = parsedInfo.fieldsByTypeName.CombinedResponse.data.fieldsByTypeName.comBined;
      const selectedFields = Object.keys(fieldsRequested);
      const selectedFieldSQL = selectedFields.map(field => `[${field}]`).join(", ");
      const [result] = await mssql.query(`
        SELECT ${selectedFieldSQL}
        FROM ${process.env.COMBINED_TABLE}
        ORDER BY month
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
      `);
      const [totalResult] = await mssql.query(`SELECT COUNT(*) AS count FROM ${process.env.COMBINED_TABLE};`);
      const last_page = Math.ceil((totalResult[0]?.count || 0) / limit);
      return {
        data: result,
        last_page: last_page,
        message: "success"
      };
    }
  }
};


module.exports = combinedQuery;
