const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");

module.exports = createHandler({
  schema,
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
      case message.includes("Variable"):
        return { message: "Variable of required type was not provided."}
      default:
        return { message };
    }
  }
});

