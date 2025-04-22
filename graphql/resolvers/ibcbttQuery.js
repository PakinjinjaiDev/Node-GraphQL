const mssql = require("../../config/mssql");
const { parseResolveInfo } = require("graphql-parse-resolve-info");
const { GraphQLError } = require("graphql");

const getSelectedFields = (info, typeName = "idc_btt") => {
  const parsedInfo = parseResolveInfo(info);
  const fieldsRequested = parsedInfo?.fieldsByTypeName?.[typeName];
  if (!fieldsRequested) return "*"; // fallback กรณี client ไม่ระบุ fields
  const selectedFields = Object.keys(fieldsRequested);
  return selectedFields.map(field => `[${field}]`).join(", ");
};

const ibcbttQuery = {
  Query: {
    get_idc_btt_by_id: async (parent, args, context, info) => {
      try {
        const { id } = args;
        const selectedFieldSQL = getSelectedFields(info);
        const query = `
          SELECT ${selectedFieldSQL}
          FROM ${process.env.IDC_BTT_TABLE}
          WHERE id = ${id};
        `;
        const [result] = await mssql.query(query);
        if (result.length === 0) {
          return {
            message: `No data found with id ${id}`,
            data: null,
          };
        }
        return {
          message: `Get data idc_btt by id ${id} successfully`,
          data: result[0],
        };
      } catch (error) {
        throw new GraphQLError("Failed to fetch data by ID", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
    get_all_idc_btt: async (parent, args, context, info) => {
      try {
        const selectedFieldSQL = getSelectedFields(info);
        const [result] = await mssql.query(`
          SELECT ${selectedFieldSQL}
          FROM ${process.env.IDC_BTT_TABLE};
        `);
        const [[{ total }]] = await mssql.query(`
          SELECT COUNT(*) AS total FROM ${process.env.IDC_BTT_TABLE};
        `);
        return {
          message: "Get all data idc_btt successfully",
          data: result,
          total_data: total,
        };
      } catch (error) {
        throw new GraphQLError("Failed to fetch all idc_btt data", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
    get_idc_btt_limit: async (parent, args, context, info) => {
      try {
        const { page, limit } = args;
        const [[{ total }]] = await mssql.query(`
          SELECT COUNT(*) AS total FROM ${process.env.IDC_BTT_TABLE};
        `);
        const last_page = Math.ceil(total / limit);

        if (page > last_page) {
          return {
            message: `Page ${page} exceeds last page (${last_page})`,
            data: [],
            total_data: total,
            current_page: page,
            limit,
            last_page,
          };
        }
        const offset = (page - 1) * limit;
        const selectedFieldSQL = getSelectedFields(info);
        const query = `
          SELECT ${selectedFieldSQL}
          FROM ${process.env.IDC_BTT_TABLE}
          ORDER BY id
          OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
        `;
        const [result] = await mssql.query(query);
        return {
          message: "Get data idc_btt successfully",
          data: result,
          total_data: total,
          current_page: page,
          limit,
          last_page,
        };
      } catch (error) {
        throw new GraphQLError("Failed to fetch paginated idc_btt data", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error },
        });
      }
    },
  },
};

module.exports = ibcbttQuery;
