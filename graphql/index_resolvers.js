const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");

const resolversDir = path.join(__dirname, "resolvers");

let mergedResolvers = {};

fs.readdirSync(resolversDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const resolverModule = require(path.join(resolversDir, file));
    mergedResolvers = merge(mergedResolvers, resolverModule);
  }
});

module.exports = mergedResolvers;
