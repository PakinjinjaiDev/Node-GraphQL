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

  extend type Query {
    idc_btt(limit: Int, page: Int): [idc_btt]
  }
`;
