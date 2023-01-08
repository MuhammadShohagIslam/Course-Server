module.exports = `
    scalar Date
    type Blog {
        _id: ID!
        title: String!
        description: String!
        author: String!
        createdAt:Date 
    }
    type Query {
        getAllBlogs: [Blog!]!
    }
`;
