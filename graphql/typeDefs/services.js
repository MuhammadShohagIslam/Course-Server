module.exports = `
    type Service {
        _id: ID!,
        name: String!,
        description: String!,
        img: Img,
        price: String!
    }
    type DeleteService{
        acknowledged: Boolean,
        deletedCount: Int
    }
   
    # input type
    input CreateNewServiceInput{
        name: String!,
        description: String!,
        img:ImgInput,
        price: String!
    }

    input UpdateServiceInput{
        name: String,
        description: String,
        img: ImgInput,
        price: String!
    }

    type Query {
        totalServices: Int!
        getAllService(page: Int): [Service!]!
        getService(serviceId: ID!):Service!
        getSearchResult(search: String!): [Service!]!
    }
    type Mutation{
        createNewService(input:CreateNewServiceInput!):Service! 
        updateService(serviceId: ID!, input: UpdateServiceInput!): Service
        removeService(serviceId: ID!):DeleteService 
    }
`;
