const mssql = require("../../config/mssql");
const { parseResolveInfo } = require("graphql-parse-resolve-info");

const ibcbttQuery = {
  Query: {
    idc_btt: async (parent, args, context, info) => {
      const { limit, page } = args;
      const offset = (page - 1) * limit;
      const parsedInfo = parseResolveInfo(info);
      const fieldsRequested = parsedInfo.fieldsByTypeName.idc_btt;
      const selectedFields = Object.keys(fieldsRequested);
      const selectedFieldSQL = selectedFields.map(field => `[${field}]`).join(", ");
      const query = `
        SELECT ${selectedFieldSQL}
        FROM ${process.env.IDC_BTT_TABLE}
        ORDER BY id
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
      `;
      const [result] = await mssql.query(query);
      return result;
    }
    
  }
};


module.exports = ibcbttQuery;
