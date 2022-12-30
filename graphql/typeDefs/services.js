module.exports = `
    type Service {
        _id: ID!,
        name: String!,
        description: String!,
        img:String!,
        price: String!
    }
    type Query {
        getAllServices(limit: Int!): [Service!]!
    }
`;
