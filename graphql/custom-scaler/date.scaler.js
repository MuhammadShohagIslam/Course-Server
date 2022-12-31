const { GraphQLScalarType } = require("graphql");

const dateScalar = new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.getTime();
    },
});

module.exports = dateScalar;
