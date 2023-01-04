module.exports = `
    type Service {
        _id: ID!,
        name: String!,
        description: String!,
        img:String!,
        price: String!
    }

    type ServiceByPage{
        servicesByPagination: [Service!]!,
        totalService: Int!
    }
    
    type Query {
        getAllServicesUnderLimit(limit: Int): [Service!]!
        getAllServiceByPage(page: Int!): ServiceByPage!
        getService(serviceId: ID!):Service!
        getSearchResult(search: String!): [Service!]!
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
