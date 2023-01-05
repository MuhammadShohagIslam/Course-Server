module.exports = `
    type User {
        _id: ID!
        fullName: String!
        email: String!
        profileImage: String!
        role: String
    }

    # input type
    input UserCreateInput {
        fullName: String!
        email: String!
        profileImage: String!
        role: String
    }

    type Query {
        allUsersByRole(role: String!): [User!]
        currentUser(email:String!): User!
        getAdminUser: Boolean!
        getUser: Boolean!
    }

    type Mutation {
        createNewUser(input: UserCreateInput!): User!
    }
`;
