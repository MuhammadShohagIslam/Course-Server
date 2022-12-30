module.exports = `
    type User {
        _id: ID!,
        userName: String!,
        fullName: String!,
        profileImage: String! 
    }

    # input type
    input UserCreateInput {
        userName: String!,
        fullName: String!,
        profileImage: String!
    }

    type Query {
        users: [User!]
    }

    type Mutation {
        createNewUser(input: UserCreateInput!): User!
    }
`;

