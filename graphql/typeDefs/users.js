module.exports = `
    type User {
        _id: ID!
        name: String!
        email: String!
        role: String
    }

    # input type
    input UserCreateInput {
        name: String!
        email: String!
        role: String
    }

    type Query {
        allUsersByRole(role: String!): [User!]
        currentUser(email:String!): User!
        getAdminUser: Boolean!
        getUser: Boolean!
    }

    type Mutation {
        createOrUpdateNewUser(input: UserCreateInput!): User!
    }
`;
