module.exports = `
    type User {
        _id: ID!
        username: String
        fullName: String
        email: String!
        role: String
        about:String
    }

    type Image implements User{
        url: String
        public_id: String
    }
    type UserCreate {
        username: String
        fullName: String
        email: String!
    }
    
    # input type
    input Image{
        url: String
        public_id: String
    }
    input UserCreateInput {
        fullName: String
        email: String!
    }

    input ProfileUpdateInput {
        username: String
        fullName: String
        email: String!
        image:Image
        about:String
    }

    type Query {
        allUsersByRole(role: String!): [User!]
        currentUser: User!
        getAdminUser: Boolean!
        getUser: Boolean!
    }

    type Mutation {
        createNewUser(input: UserCreateInput!): UserCreate
        profileUpdate(input: ProfileUpdateInput): User! 
    }
`;
