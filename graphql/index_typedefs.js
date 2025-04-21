const fs = require("fs");
const path = require("path");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const typeDefsDir = path.join(__dirname, "typeDefs");

let allTypeDefs = [];


fs.readdirSync(typeDefsDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const typeDef = require(path.join(typeDefsDir, file));
    allTypeDefs.push(typeDef);
  }
});

module.exports = mergeTypeDefs(allTypeDefs);
