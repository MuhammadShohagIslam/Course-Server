module.exports = `
    type Service {
        _id: ID!,
        name: String!,
        description: String!,
        img: Img,
        price: String!
    }
    type ServiceByPage{
        servicesByPagination: [Service!]!,
        totalService: Int!
    }
    type UpdatedService{
        acknowledged: Boolean,
        modifiedCount: Int,
        upsertedId: String,
        upsertedCount: Int,
        matchedCount: Int
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
        getAllServicesUnderLimit(limit: Int): [Service!]!
        getAllServiceByPage(page: Int!): ServiceByPage!
        getService(serviceId: ID!):Service!
        getSearchResult(search: String!): [Service!]!
    }
    type Mutation{
        createNewService(input:CreateNewServiceInput!):Service! 
        updateService(serviceId: ID!, input: UpdateServiceInput!): UpdatedService
        removeService(serviceId: ID!):DeleteService 
    }
    type Subscription{
        serviceAdded: Service
    }
`;
