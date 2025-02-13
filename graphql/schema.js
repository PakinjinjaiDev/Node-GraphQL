const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    message: String
    users: [User]
    combined(limit: Int, page: Int): [comBined]
  }

  type User {
    id: String
    name: String
    email: String
  }
  
  type comBined {
   month: String
   type: String
   so_number: String
   cs_number: String
   cs003: String
   inv: String
   contractstartdate: String
   contractenddate: String
   customer_id: String
   customer_name: String
   sale_id: Float
  }
`);

module.exports = schema;
