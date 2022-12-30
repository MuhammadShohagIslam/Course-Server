const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const path = require("path");

const typeDefs = mergeTypeDefs(
    loadFilesSync(path.join(__dirname, "../graphql/typeDefs"))
);

const resolvers = mergeResolvers(
    loadFilesSync(path.join(__dirname, "../graphql/resolvers"))
);

module.exports = {
    typeDefs,
    resolvers,
};
