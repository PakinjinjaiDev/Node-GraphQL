const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    message: String
    users: [User]
    combined(limit: Int, page: Int): [comBined]
    idc_btt(limit: Int, page: Int): [idc_btt]
  }
  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): String
  }
  type User {
    id: String
    name: String
    email: String
  }
  type idc_btt {
    id: Int
    device_name: String
    unit: String
    unixtime: String
    time: String
    value: Float
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
   sale_name: String
   sale_team: String
   service: String
   so_type_2: String
   type_cus: String
   enuser: Float
   prorate: Float
   rev_total: Float
   vmi: Float
   rev_cloud: Float
   avg_vmi:Float
   total_actual: Float
   total_actual_cost: Float
   total_eng_cost: Float
   sale_factors: Float
   total_internal: Float
   total_external_jv: Int
   total_external: Float
   int_inet: Float
   ext_jv: Float
   external: Float
   total_cpu: Int
   total_disk: Int
   total_memory: Int
   int_cloud: Float
   external_cloud: Int
   int_colocation: Float
   external_colocation: Int
   int_jv: Float
   external_jv: Int
   int_lead: Float
   external_lead: Int
   int_ms: Float
   external_ms: Int
   int_network: Float
   external_network: Int
   int_security: Float
   external_security: Int
   int_trading: Float
   external_trading: Int
   update_at_etl: String
  }
`);

module.exports = schema;
