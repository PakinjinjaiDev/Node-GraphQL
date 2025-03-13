const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const resolvers = require("../graphql/index");

module.exports = createHandler({
  schema,
  rootValue: resolvers,
  formatError: (err) => {
    const message = err.message;
    switch (true) {
      case message.includes("Cannot query field"):
        return { message: "Cannot query field" };
      case message.includes("Syntax Error") && message.includes("Unexpected character"):
        return { message: "Unexpected character" };
      case message.includes("Syntax Error"):
        return { message: "Syntax Error" };
      case message.includes("Unknown argument"):
        return { message: "Unknown argument" };
      default:
        return { message };
    }
  }
});

