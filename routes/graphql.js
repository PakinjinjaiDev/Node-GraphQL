const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const resolvers = require("../graphql/index");

module.exports = createHandler({
  schema,
  rootValue: resolvers,
  formatError: (err) => {
    // log error เพื่อ debug
    // console.error("GraphQL Error:", err);
    return {
      status: "error",
      message: "มีข้อผิดพลาดบางอย่างในการร้องขอ กรุณาตรวจสอบ Query หรือ Mutations ของคุณ",
      // detail: `${err}`
    };
  },
});
