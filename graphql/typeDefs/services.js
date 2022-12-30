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
        getService(serviceId: ID!):Service!
    }

    # input type
    input CreateNewServiceInput{
        name: String!,
        description: String!,
        img:String!,
        price: String!
    }
    type Mutation{
        createNewService(input:CreateNewServiceInput!):Service! 
    }
`;
