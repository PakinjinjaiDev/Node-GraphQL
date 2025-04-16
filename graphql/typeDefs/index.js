const { mergeTypeDefs } = require('@graphql-tools/merge');

const base = require('./baseTypeDefs');
const user = require('./userTypeDefs');
const combined = require('./combinedTypeDefs');
const ibcbtt = require('./ibcbttTypeDefs');

module.exports = mergeTypeDefs([base, user, combined, ibcbtt]);
