const { gql } = require("graphql-tag");

module.exports = gql`
  type idc_btt {
    id: Int
    device_name: String
    unit: String
    unixtime: String
    time: String
    value: Float
  }
  type idc_btt_get_all {
    message: String
    data: [idc_btt]
    total_data: Int
  }
  type idc_btt_limit {
    message: String
    data: [idc_btt]
    total_data: Int
    current_page: Int
    limit: Int
    last_page: Int
  }
  type idc_btt_by_id {
    message: String
    data: idc_btt
  }
  extend type Query {
    get_idc_btt_by_id(id: Int!): idc_btt_by_id
    get_all_idc_btt: idc_btt_get_all
    get_idc_btt_limit(page: Int!, limit: Int!): idc_btt_limit
  }
`;
