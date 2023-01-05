module.exports = `
    type User {
        _id: ID!
        userName: String!
        fullName: String!
        email: String!
        profileImage: String!
    }

    # input type
    input UserCreateInput {
        userName: String!
        fullName: String!
        email: String!
        profileImage: String!
    }

    type Query {
        allUsers: [User!]
    }

    type Mutation {
        createNewUser(input: UserCreateInput!): User!
    }
`;

