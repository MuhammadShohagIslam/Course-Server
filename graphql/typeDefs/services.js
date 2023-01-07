module.exports = `
    type Service {
        _id: ID!,
        name: String!,
        description: String!,
        img: String,
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
    type DeleteReview{
        acknowledged: Boolean,
        deletedCount: Int
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

    input UpdateServiceInput{
        name: String,
        description: String,
        img: ImgInput!,
        price: String!
    }
    type Mutation{
        createNewService(input:CreateNewServiceInput!):Service! 
        updateService(serviceId: ID!, input: UpdateServiceInput!): UpdatedService
        removeService(serviceId: ID!):DeleteReview 
    }
    type Subscription{
        serviceAdded: Service
    }
`;
