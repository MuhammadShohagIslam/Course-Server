module.exports = `
    type Img{
        url: String
        public_id: String
    }
    type User {
        _id: ID!
        username: String
        fullName: String
        email: String!
        role: String
        image:Img
        about:String
    }
    type UserCreate {
        username: String
        fullName: String
        email: String!
    }
    
    # input type
    input ImgInput{
        url: String
        public_id: String
    }
    input UserCreateInput {
        fullName: String
        email: String!
        image:ImgInput
    }

    input ProfileUpdateInput {
        username: String
        fullName: String
        email: String!
        image:ImgInput
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
