const mssql = require("../config/mssql");

const logGraphQLRequest = async (req, res, next) => {
  if (req.method === "POST" && req.url === "/bi-team") {
    const { query, variables } = req.body;
    const headers = JSON.stringify(req.headers);
    const ip = req.ip;
    const trimmedQuery = query.trim().toLowerCase();
    const isMutation = trimmedQuery.startsWith("mutation");
    const type = isMutation ? "MUTATION" : "QUERY";
    console.log(type);
    res.on("finish", async () => {
        const status = res.statusCode
        const data = res.json();
        // console.log(status);
        if (status === 200) {
          // console.log(data);
          try {
            await mssql.query(`
              INSERT INTO ${process.env.GRPAHQL_LOG} (ip, status, type, message, query, variables, headers)
              VALUES ('${ip}', '${status}', '${type}', 'success', '${query}', '${variables}', '${headers}')
            `);      
            console.log("✅ GraphQL request logged to database");
          } catch (e) {
            console.error("❌ Failed to log GraphQL request:", e);
          }
        }
    });
  }
  next();
};

module.exports = logGraphQLRequest;
