const queryResolvers = require("./resolvers/queryResolvers");
const userMutation = require('./resolvers/userMutations');
const userQuery = require("./resolvers/userQuery");
const combinedQuery = require("./resolvers/combinedQuery");
const ibcbttQuery = require("./resolvers/ibcbttQuery");

const resolvers = {
  ...queryResolvers,
  ...userQuery,
  ...ibcbttQuery,
  // ...combinedQuery,
  combined: combinedQuery.combined,
  // ทำไมไม่ใช้ ...combinedQuery แทน combined: combinedQuery.combined
  // เพราะ combinedQuery เป็น object ที่มี key คือ combined ดังนั้นหากใช้: ...combinedQuery
  // GraphQL จะคาดหวังว่า combinedQuery จะมีหลาย resolver 
  // แต่ในกรณีนี้ combinedQuery มีแค่ หนึ่ง resolver (combined) 
  // เราจึงต้องระบุชัดเจนเป็น: combined: combinedQuery.combined
  ...userMutation,
};

module.exports = resolvers;
