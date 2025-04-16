const { gql } = require("graphql-tag");

module.exports = gql`
  type CombinedResponse {
    data: [comBined]
    last_page: Int
    message: String
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
    avg_vmi: Float
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

  extend type Query {
    combined(limit: Int, page: Int): CombinedResponse
  }
`;
